import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Post collection schema
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(), // Importante para SEO y resúmenes de BlogCard
    date: z.date(), // Hacer la fecha obligatoria para ordenar y mostrar
    image: z.string().optional(), // Imagen destacada para el post
    author: z.string().default("Dra. Paola Mafla Rosero"), // Autor por defecto
    categories: z.array(z.string()).default(["Consejos de Ortodoncia"]), // Categoría por defecto relevante
    tags: z.array(z.string()).optional(), // Hacer los tags opcionales
    draft: z.boolean().optional().default(false), // Por defecto los posts no son borradores
  }),
});

// Author collection schema
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/autores" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// about collection schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// contact collection schema
const contactCollection = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),

    // Información general de contacto
    intro_text: z.string().optional(),
    phone_number: z.string().optional(),
    phone_number_display: z.string().optional(),
    whatsapp_number: z.string().optional(),
    whatsapp_text: z.string().optional(),
    email_address: z.string().email().optional(),

    // Múltiples ubicaciones (nuevo formato)
    locations: z
      .array(
        z.object({
          name: z.string(),
          address: z.string(),
          map_embed_code: z.string().optional(),
          opening_hours: z.array(z.string()).optional(), // Horarios específicos por ubicación
        }),
      )
      .optional(),

    // Campos del formato anterior (compatibilidad hacia atrás)
    full_address: z.string().optional(),
    map_embed_code: z.string().optional(),

    // Otros campos
    opening_hours: z.array(z.string()).optional(), // Horarios globales (compatibilidad)
    social_media: z
      .array(
        z.object({
          platform: z.string(),
          url: z.string().url(),
        }),
      )
      .optional(),
  }),
});

// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

// Call to Action collection schema
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    image_alt: z.string().optional(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// Testimonials Section collection schema
const testimonialSectionCollection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        avatar: z.string().optional(), // Hacer el avatar opcional si no todos los pacientes quieren mostrar foto
        designation: z.string(), // Podríamos renombrar esto a algo como "Tipo de Tratamiento" o "Paciente de"
        content: z.string(),
        image_before: z.string().optional(), // Opcional: imagen del "antes"
        image_after: z.string().optional(), // Opcional: imagen del "después"
      }),
    ),
  }),
});

// About collection schema
const storyCollection = defineCollection({
  loader: glob({
    pattern: "story.{md,mdx}",
    base: "src/content/about/",
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    cover: z.string(),
    avatar: z.string(),
    stats: z.array(
      z.object({
        value: z.number(),
        suffix: z.string(),
        label: z.string(),
      }),
    ),
    doctor: z.object({
      name: z.string(),
      points: z.array(z.string()),
    }),
  }),
});

// About › valores
const valoresCollection = defineCollection({
  loader: glob({
    pattern: "valores.{md,mdx}",
    base: "src/content/about/",
  }),
  schema: z.object({
    title: z.string(),
    valores: z.array(
      z.object({
        name: z.string(),
        icon: z.string(),
        description: z.string(),
      }),
    ),
  }),
});

const servicesIndexCollection = defineCollection({
  loader: glob({ pattern: "-index.{md,mdx}", base: "src/content/servicios" }), // Patrón para el archivo -index
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    intro_text: z.string().optional(),
  }),
});

// Schema para los SERVICIOS INDIVIDUALES (apunta a todos los demás .md en 'servicios')
const serviceItemsCollection = defineCollection({
  loader: glob({
    pattern: "!(-index)*.{md,mdx}", // Patrón para todos los archivos EXCEPTO -index.md
    base: "src/content/servicios",
  }),
  schema: z.object({
    title: z.string(),
    short_description: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    // content: z.string(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const galleryCollection = defineCollection({
  // No necesitas 'loader' aquí si vas a usar getCollection directamente
  // y los archivos están en src/content/galeria/
  type: "content", // o 'data' si solo es frontmatter sin cuerpo Markdown principal
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    // Imagen principal de la página de galería, si la tiene
    header_image: z.string().optional(),
    draft: z.boolean().optional().default(false),
    // Array para los ítems de la galería
    gallery_items: z
      .array(
        z.object({
          image_url: z.string(), // Ruta a la imagen
          alt_text: z.string(), // Texto alternativo
          caption: z.string().optional(), // Leyenda opcional
          category: z.string().optional(), // Categoría para filtrar (opcional)
        }),
      )
      .optional(),
  }),
});

// Export collections
export const collections = {
  // Pages
  homepage: homepageCollection,
  blog: blogCollection,
  autores: authorsCollection,
  pages: pagesCollection,
  about: aboutCollection,
  contact: contactCollection,

  // sections
  ctaSection: ctaSectionCollection,
  testimonialSection: testimonialSectionCollection,

  // about
  story: storyCollection,
  valores: valoresCollection,

  // services
  servicesIndex: servicesIndexCollection, // Para el -index.md de la página de servicios
  servicios: serviceItemsCollection, // Para los archivos de servicios individuales (ortodoncia.md, etc.)

  // gallery
  galeria: galleryCollection,
};
