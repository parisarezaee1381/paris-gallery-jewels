# Paris Gallery Jewels

Parisa:

PROJECT: PARIS GALLERY

Premium Jewelry E-commerce Website

Act as a senior UI/UX designer, brand strategist, and experienced frontend developer.

Your task is to design and build a complete, responsive, visually sophisticated e-commerce website for a jewelry brand called Paris Gallery.

Do not create a generic online store template. Build a distinctive, editorial, luxury-inspired shopping experience with a strong visual identity.

1. BRAND IDENTITY

Brand Name: Paris Gallery

Business:

An independent jewelry brand specializing in artistic handmade polymer clay earrings.

Target Audience:

Women aged 18–30 who appreciate vintage fashion, artistic accessories, individuality, and distinctive statement jewelry.

Brand Personality:

• Artistic

• Sophisticated

• Feminine

• Expressive

• Independent

• Vintage-inspired

• Contemporary

Brand Positioning:

Paris Gallery should feel like an independent fashion jewelry boutique rather than a mass-market accessories store.

2. VISUAL DIRECTION

Combine two visual styles:

A. Retro Editorial:

• Inspired by 1960s and 1970s fashion magazines.

• Geometric patterns.

• Asymmetric layouts.

• Editorial typography.

• Artistic compositions.

B. Dark Luxury:

• Dramatic product photography.

• Deep black backgrounds in selected sections.

• Burgundy accents.

• Elegant typography.

• Sophisticated visual hierarchy.

COLOR PALETTE:

Primary Background: #F7F3ED

Primary Text: #171717

Secondary Background: #E8DFD3

Accent: #6D1F32

Secondary Text: #66615D

Borders: #D7D0C8

Use black and ivory as the dominant colors, with burgundy as an accent.

Avoid:

• Excessive gold.

• Generic luxury templates.

• Unnecessary gradients.

• Excessive shadows.

• Overly rounded cards.

• Generic stock photography.

• Excessive decorative elements.

3. TYPOGRAPHY

Use an elegant editorial serif font for large headings and a clean sans-serif font for body text and interface elements.

The website must support Persian (Farsi) as its primary language.

Important:

• All customer-facing content must be in Persian.

• Use proper RTL layout.

• Use Persian numerals where appropriate.

• Keep the brand name Paris Gallery in English.

• Ensure typography is readable on mobile devices.

4. WEBSITE STRUCTURE

Build the following four main pages:

PAGE 1: HOME

Sections:

• Header:

• Paris Gallery logo.

• Navigation: خانه، فروشگاه، مجموعه‌ها، درباره ما.

• Search icon.

• Favorites icon.

• Responsive mobile menu.

• Hero Section:

• Large editorial jewelry photograph.

• Elegant headline introducing Paris Gallery.

• Short brand description.

• Primary CTA: مشاهده مجموعه.

• Sophisticated asymmetric layout.

• Featured Collections:

    Display selected jewelry collections using large editorial image cards.

Suggested categories:

• رترو

• مینیمال

• انتزاعی

• گوشواره‌های خاص

• New Arrivals:

    Display recently added products in a responsive product grid.

• Featured Product:

    Highlight one selected product with a large image and editorial description.

• Brand Story:

    Introduce the artistic identity of Paris Gallery with an image and a short description.

• Instagram Gallery:

    Display a visual gallery of jewelry photography.

• Footer:

    Include navigation links, contact information, Instagram, and order information.

PAGE 2: SHOP

Create a complete product listing page.

Include:

• Page title.

• Product count.

• Responsive product grid.

• Search functionality.

• Category filters.

• Price filters.

• Sorting options.

• Favorite buttons.

Product cards must include:

• Product image.

• Product name.

• Price in Iranian toman.

• Availability badge.

• Optional New Arrival badge.

• Favorite icon.

Use a clean editorial layout that prioritizes product photography.

PAGE 3: PRODUCT DETAILS

Create a premium product detail page.

Include:

• Breadcrumb navigation.

• Product image gallery with thumbnails.

• Product name.

• Price in Iranian toman.

• Product description.

• Material information.

• Dimensions.

• Approximate weight.

• Availability status.

• Quantity selector, respecting available stock.

• Primary reservation button.

• WhatsApp contact button.

• Related products section.

The product gallery should be visually prominent.

PAGE 4: ABOUT US

Create an editorial brand story page.

Include:

• Brand introduction.

• Brand philosophy.

• Design inspiration.

• Handmade craftsmanship.

• Editorial imagery.

• Contact CTA.

Avoid generic corporate language. Make the brand feel artistic and personal.

5. RESERVATION AND PURCHASE FLOW

IMPORTANT BUSINESS REQUIREMENT:

This website does NOT require online payment.

Do not implement:

• Payment gateway.

• Online checkout.

• Credit card payment.

• Complex shopping cart.

• Online transaction processing.

Instead, implement a product reservation request flow.

When customers click the “درخواست رزرو” button:

Option A:

Redirect them to WhatsApp with a pre-filled Persian message containing:

• Product name.

• Product ID.

• Product price.

• Requested quantity.

Option B:

If a reservation form is implemented, collect:

• Customer name.

• Mobile number.

• Selected product.

• Quantity.

• Optional message.

Make it clear that a reservation request does not guarantee availability or confirm a purchase.

Use a configurable WhatsApp phone number placeholder.

Do not invent a real phone number.

6. PRODUCT DATA

Create a reusable product data structure.

Each product should support:

• Unique ID.

• Product name.

• Slug.

• Description.

• Price.

• Images.

• Category.

• Material.

• Dimensions.

• Weight.

• Stock quantity.

• Availability status.

• New arrival status.

• Featured status.

Use sample products as placeholders.

Create at least 8 visually distinct sample products with Persian names.

Use realistic placeholder jewelry photography or appropriate generated product imagery.

Make it easy to replace sample products with real product information later.

7. DESIGN SYSTEM

Create a consistent reusable component system.

Include:

Navigation:

• Header.

• Logo.

• Navigation Item.

• Dropdown Menu.

• Search Bar.

• Breadcrumb.

• Footer.

• Mobile Navigation.

Product:

• Product Card.

• Product Gallery.

• Product Thumbnail.

• Product Badge.

• Product Price.

• Product Title.

• Product Description.

• Product Specifications.

• Stock Status.

• Favorite Button.

• Product Grid.

Actions:

• Primary Button.

• Secondary Button.

• WhatsApp Button.

• Reservation Button.

• Icon Button.

Forms:

• Text Input.

• Phone Input.

• Text Area.

• Checkbox.

• Radio Button.

• Select.

Feedback:

• Toast Notification.

• Modal.

• Empty State.

• Error State.

• Success State.

Layout:

• Container.

• Section Header.

• Two Column Layout.

• Image with Text.

• Responsive Grid.

Use reusable components rather than duplicating interface elements.

8. FUNCTIONAL REQUIREMENTS

The website must have working interactions.

Implement:

• Navigation between all four pages.

• Product search.

• Category filtering.

• Price filtering.

• Product sorting.

• Product detail navigation.

• Favorites functionality.

• WhatsApp reservation links.

• Responsive mobile navigation.

• Product availability indicators.

• Functional buttons and links.

Persist favorites locally where appropriate.

Do not create non-functional decorative buttons.

9. RESPONSIVE DESIGN

Design for:

Desktop: 1440px

Tablet: 768px

Mobile: 390px

Requirements:

• Fully responsive layouts.

• Mobile-friendly navigation.

• Responsive product grids.

• Optimized product galleries.

• Readable typography.

• Touch-friendly buttons.

• Correct RTL behavior at all screen sizes.

10. TECHNICAL REQUIREMENTS

Use a modern frontend architecture.

Preferred technologies:

• React.

• TypeScript.

• Tailwind CSS.

• Reusable components.

• Lucide icons.

Use clean, maintainable code.

Separate:

• Components.

• Pages.

• Product data.

• Styles.

• Utilities.

Avoid unnecessary dependencies.

Optimize images and page performance.

Use semantic HTML and accessible controls.

Make sure all routes work correctly.

11. FINAL QUALITY REQUIREMENTS

Before considering the project complete:

• Review all four pages.

• Test navigation.

• Test search and filtering.

• Test favorite functionality.

• Test WhatsApp reservation links.

• Check mobile and desktop layouts.

• Verify Persian RTL rendering.

• Fix broken links and non-functional buttons.

• Ensure visual consistency across all pages.

The final result should look like a professionally designed independent jewelry boutique with a distinctive fashion-editorial identity.

Prioritize visual quality, usability, brand consistency, and functional implementation.

Do not stop at a static mockup. Build a working frontend website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://paris-gallery-jewels.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a7b5f7b0-5d3b-5030-8f8a-9f49cbe448ca).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
