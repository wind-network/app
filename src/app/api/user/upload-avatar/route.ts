import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { users, userProfilePictures } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('avatar') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Process image with sharp
    const processedImage = await sharp(buffer)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toBuffer()

    // Create thumbnail
    const thumbnail = await sharp(buffer)
      .resize(100, 100, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 80 })
      .toBuffer()

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'avatars')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${session.user.id}-${timestamp}.jpg`
    const thumbnailFilename = `${session.user.id}-${timestamp}-thumb.jpg`

    // Save files
    await writeFile(join(uploadDir, filename), processedImage)
    await writeFile(join(uploadDir, thumbnailFilename), thumbnail)

    // URLs for the images
    const imageUrl = `/uploads/avatars/${filename}`
    const thumbnailUrl = `/uploads/avatars/${thumbnailFilename}`

    // Update user profile picture in database
    await db.update(users)
      .set({
        profilePictureUrl: imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))

    // Save to profile pictures history
    await db.insert(userProfilePictures).values({
      userId: session.user.id,
      url: imageUrl,
      thumbnailUrl: thumbnailUrl,
      fileSize: file.size,
      mimeType: 'image/jpeg',
      isActive: true,
    })

    return NextResponse.json({
      message: 'Avatar uploaded successfully',
      imageUrl,
      thumbnailUrl,
    })
  } catch (error) {
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    )
  }
}