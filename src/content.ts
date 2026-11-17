export type ProjectKind = 'Website' | 'Online shop' | 'Web app' | 'Redesign' | 'Not sure yet'
export type Concept = {
  id: 'offday' | 'morrow' | 'forma' | 'alex'
  name: string
  category: string
  title: string
  description: string
  image?: string
  alt: string
  kind: ProjectKind
  capabilities: string[]
}

export const concepts: Concept[] = [
  {
    id: 'offday',
    name: 'Offday Objects',
    category: 'Online shops',
    title: 'An everyday object. A different point of view.',
    description:
      'A considered shop experience for objects with a little personality. Explore a collection, find a favorite, and look a little closer.',
    image: '/images/offday-objects.webp',
    alt: 'Sculptural blue chair and a cream side table in a light studio',
    kind: 'Online shop',
    capabilities: ['Product catalog', 'Search & filters', 'Saved favorites'],
  },
  {
    id: 'morrow',
    name: 'Morrow Coffee',
    category: 'Food & drink',
    title: 'A good morning starts before the first sip.',
    description:
      'A neighborhood café, made easy to discover. Browse a sample menu and switch between coffee and something from the bakery.',
    image: '/images/morrow-coffee.webp',
    alt: 'A glass of coffee and a croissant on a sunlit steel café counter',
    kind: 'Website',
    capabilities: ['Interactive menu', 'Clear categories', 'Business story'],
  },
  {
    id: 'forma',
    name: 'Forma Studio',
    category: 'Service businesses',
    title: 'A quieter way to make a strong first impression.',
    description:
      'A studio website that puts the work first. Explore a project, understand the service, and find the right starting point.',
    image: '/images/forma-space.webp',
    alt: 'A timber chair and steel lamp against a warmly lit plaster wall',
    kind: 'Website',
    capabilities: ['Project stories', 'Service discovery', 'Inquiry direction'],
  },
  {
    id: 'alex',
    name: 'Alex Morgan',
    category: 'Portfolios',
    title: 'A personal portfolio with something to say.',
    description:
      'An independent creative’s home on the web. Browse selected concept work and open the story behind each project.',
    alt: 'Original typographic composition for Alex Morgan’s concept portfolio',
    kind: 'Website',
    capabilities: ['Selected work', 'Project details', 'Personal identity'],
  },
]
export const categories = ['All work', ...new Set(concepts.map((concept) => concept.category))]
export const projectTypes: ProjectKind[] = [
  'Website',
  'Online shop',
  'Web app',
  'Redesign',
  'Not sure yet',
]
export const featureOptions = [
  'Contact & inquiries',
  'Product catalog',
  'Search & filters',
  'Bookings',
  'Content management',
  'Client accounts',
  'Online payments',
  'Multiple languages',
]
export const pageOptions = [
  'Home',
  'About',
  'Services',
  'Work',
  'Shop',
  'Product details',
  'Contact',
  'FAQ',
  'Workspace',
]
export const services: {
  id: string
  title: string
  label: string
  description: string
  detail: string
  items: string[]
  kind: ProjectKind
  features: string[]
}[] = [
  {
    id: 'websites',
    title: 'Websites with a purpose.',
    label: '01 / WEBSITES & PORTFOLIOS',
    description: 'A clear home for your business, your services, and the work you’re proud of.',
    detail:
      'For independent businesses, service providers, and people building a name for themselves. We bring the structure, design, and development together.',
    items: [
      'Business websites & landing pages',
      'Portfolios & service pages',
      'Responsive design & development',
    ],
    kind: 'Website',
    features: ['Contact & inquiries'],
  },
  {
    id: 'shops',
    title: 'A better place to shop.',
    label: '02 / ONLINE SHOPS',
    description: 'Thoughtful product discovery, from the first browse to the next step.',
    detail:
      'Make your products easy to explore and your business easy to understand. Catalogs, checkout, and fulfillment are scoped around the way you actually sell.',
    items: [
      'Product catalogs & collections',
      'Search, filters & product pages',
      'Commerce integrations, agreed together',
    ],
    kind: 'Online shop',
    features: ['Product catalog', 'Search & filters'],
  },
  {
    id: 'tools',
    title: 'Tools that do the work.',
    label: '03 / WEB APPS & BUSINESS TOOLS',
    description: 'Useful software for the parts of your day that could work better.',
    detail:
      'From a focused internal tool to a client-facing workspace. We map the workflow first, then plan the accounts, data, and integrations the tool needs.',
    items: [
      'Client portals & internal tools',
      'Forms, workflows & dashboards',
      'Existing-site improvements & integrations',
    ],
    kind: 'Web app',
    features: ['Client accounts', 'Content management'],
  },
]
export const processSteps = [
  {
    name: 'Find the right starting point.',
    short: 'Discover',
    text: 'We talk about your business, what people need from your website, and what is worth building first.',
    outputs: ['A useful project brief', 'Clear priorities', 'An agreed scope & quote'],
  },
  {
    name: 'Give the idea a shape.',
    short: 'Design',
    text: 'We work through the structure, content, and visual direction together. You see how it fits before we build it.',
    outputs: [
      'Page structure & user journeys',
      'A visual direction',
      'Your feedback, worked into the design',
    ],
  },
  {
    name: 'Make it work properly.',
    short: 'Build',
    text: 'We turn the design into a working website, with real interactions and checks across screen sizes.',
    outputs: ['Responsive development', 'Working features', 'Browser & interaction checks'],
  },
  {
    name: 'Launch with a clear handoff.',
    short: 'Handoff',
    text: 'We review the details, prepare the agreed hosting setup, and make sure you know how your website works.',
    outputs: ['A launch review', 'Your agreed files & access', 'A plan for updates & support'],
  },
]
export const timelineOptions = ['Let’s discuss it', 'Within a month', 'In 1–3 months', 'Flexible']
export const budgetOptions = [
  'Scope first, then a quote',
  'I have a range to discuss',
  'Start small, grow later',
]

export const faqs = [
  {
    question: 'What if I only have an idea?',
    answer:
      'That is a useful starting point. Use the project planner to tell us what your business does and what you would like the website to help with. We can work out the scope together.',
  },
  {
    question: 'Are these real client projects?',
    answer:
      'The work shown here is a collection of original, interactive design concepts. The businesses and imagery are illustrative. They show how we think and build; they are not delivered client projects.',
  },
  {
    question: 'How much will my project cost?',
    answer:
      'We quote around the pages, content, features, and integrations your project needs. There are no automatic prices or payments here. We agree on the scope and costs before paid work begins.',
  },
  {
    question: 'Can you improve an existing website?',
    answer:
      'Yes. Choose Redesign in the planner and tell us what works, what does not, and what you want to change. We can discuss a focused improvement or a larger rebuild.',
  },
  {
    question: 'What happens after I make a brief?',
    answer:
      'You can copy or download it, and choose to keep a draft in this browser. Our public contact details are being prepared. Until they are added, the brief stays with you and is not sent to Sura.',
  },
]
