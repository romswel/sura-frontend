export type Concept = {
  id: string
  name: string
  category: string
  title: string
  description: string
  headline: string
  subline: string
  action: string
  features: string[]
}

export const concepts: Concept[] = [
  {
    id: 'morrow',
    name: 'Morrow',
    category: 'Food & drink',
    title: 'A little taste of your business.',
    description: 'A welcoming home for a neighborhood café, with a menu that is easy to explore.',
    headline: 'Good coffee.\nBetter company.',
    subline: 'A slower start. A familiar face. Your everyday little ritual.',
    action: 'Explore the menu',
    features: ['Food and drink menu', 'Opening hours and location', 'A place to tell your story'],
  },
  {
    id: 'forma',
    name: 'Forma',
    category: 'Services',
    title: 'Let your work do the talking.',
    description: 'An intentional portfolio for a local studio, professional, or service business.',
    headline: 'Room for\nbetter living.',
    subline: 'Considered spaces. Everyday possibilities.',
    action: 'View our spaces',
    features: ['Project gallery', 'Clear service information', 'A simple inquiry journey'],
  },
  {
    id: 'offday',
    name: 'Offday',
    category: 'Shops',
    title: 'Give your products a place.',
    description:
      'A clean product showcase that helps people discover what makes your shop different.',
    headline: 'Less ordinary.\nMore you.',
    subline: 'Thoughtful objects for the spaces you call yours.',
    action: 'Discover the collection',
    features: ['Product collections', 'Individual product details', 'A path to ask about an item'],
  },
  {
    id: 'alex',
    name: 'Alex Morgan',
    category: 'Personal brands',
    title: 'A home for what you do best.',
    description: 'A personal website for a freelancer, creator, or independent professional.',
    headline: 'Good ideas.\nClear words.',
    subline: 'Independent creative. Helping ambitious ideas find their voice.',
    action: 'See selected work',
    features: ['Selected work', 'About and experience', 'Direct contact information'],
  },
]

export const categories = ['All concepts', ...new Set(concepts.map((concept) => concept.category))]
export const projectTypes = [
  'Not sure yet',
  'Food & drink',
  'Services',
  'Shops',
  'Personal brands',
  'Something else',
]

export const faqs = [
  {
    question: 'I only have an idea. Is that enough?',
    answer:
      'Yes. Tell us what your business does, who you want to reach, and what you want visitors to do. You do not need a technical plan to start a conversation.',
  },
  {
    question: 'Are the websites in the gallery real client projects?',
    answer:
      'They are original design concepts, created to help you picture what is possible. They are not completed client projects. Your website would be designed around your own business, content, and goals.',
  },
  {
    question: 'How much would my website cost?',
    answer:
      'That depends on the pages, content, and features you need. We would agree on a clear scope and quote before any paid work begins. There are no fixed packages or payment collection on this website yet.',
  },
  {
    question: 'Can you build more than a simple website?',
    answer:
      'We can discuss forms, booking journeys, catalogs, and business tools. We will first work out what is practical, what needs another service, and what the running costs would be. Every feature needs its own agreed scope.',
  },
  {
    question: 'Will my website work on a phone?',
    answer:
      'Responsive layouts, readable content, and straightforward navigation are part of how we approach every website. We check the agreed pages at mobile and desktop sizes before handoff.',
  },
]
