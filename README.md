# Wind Space - Landing Page

A stunning, high-performance landing page for Wind Space - the world's most efficient decentralized storage service. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Sleek, professional design with glassmorphism effects and noise textures
- **High Performance**: Optimized for speed with Next.js 15 and efficient animations
- **Fully Responsive**: Works perfectly on all devices and screen sizes
- **Accessibility**: Built with accessibility best practices
- **Type Safe**: Written in TypeScript for better development experience
- **Smooth Animations**: Powered by Framer Motion for buttery smooth interactions
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & JetBrains Mono (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wind-space-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
wind-space-landing/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Features.tsx      # Features showcase
│   ├── Stats.tsx         # Statistics section
│   ├── TechSpecs.tsx     # Technical specifications
│   ├── Pricing.tsx       # Pricing plans
│   ├── CTA.tsx           # Call-to-action section
│   ├── Footer.tsx        # Footer component
│   └── Navbar.tsx        # Navigation bar
├── hooks/                 # Custom React hooks
│   └── useIntersectionObserver.ts
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) to Cyan (#06b6d4) gradients
- **Background**: Dark slate (#0a0e1a, #1e293b)
- **Text**: White (#ffffff) and Slate variants
- **Accents**: Green, Purple, Orange for highlights

### Typography
- **Headings**: Inter (bold, various sizes)
- **Body**: Inter (regular, medium)
- **Code**: JetBrains Mono

### Effects
- **Glassmorphism**: Backdrop blur with transparency
- **Noise Texture**: Subtle animated noise overlay
- **Smooth Animations**: Framer Motion powered interactions
- **Gradient Backgrounds**: Multi-layer animated gradients

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic code splitting by Next.js
- **Bundle Analysis**: Webpack optimizations for smaller bundles
- **Font Optimization**: Google Fonts with display swap
- **Animation Performance**: GPU-accelerated animations with Framer Motion
- **Lazy Loading**: Intersection Observer for scroll-triggered animations

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Animations
Modify animations in `app/globals.css`:

```css
@keyframes yourAnimation {
  /* Animation keyframes */
}
```

### Content
Update content in the respective component files in the `components/` directory.

## 📈 SEO Features

- Meta tags optimization
- Open Graph tags for social sharing
- Twitter Card support
- Structured data markup
- Sitemap generation
- Robots.txt configuration

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The project supports deployment on:
- Netlify
- AWS Amplify
- Railway
- Any platform supporting Node.js

### Build for Production
```bash
npm run build
npm start
```

## 🔍 Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://windspace.io
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 Analytics

The site is prepared for analytics integration:
- Google Analytics 4
- Plausible Analytics
- PostHog
- Custom tracking events

Add your analytics provider in `app/layout.tsx`.

## 🧪 Testing

Run type checking:
```bash
npm run type-check
```

Run linting:
```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

For support, email support@windspace.io or join our Discord community.

---

**Built with ❤️ for the Wind Space community**