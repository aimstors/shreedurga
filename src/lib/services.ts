import {
  Home, Briefcase, ChefHat, Shirt, Tv, Bed,
  PenTool, Box,
  Layers, Square, LayoutPanelTop, Wallpaper,
  AppWindow, Columns, GlassWater,
  Sheet, Fence,
  TreePine, Sparkles,
} from 'lucide-react'

export type Service = {
  slug: string
  title: string
  desc: string
  icon: any
}

export type ServiceCategory = {
  id: string
  title: string
  services: Service[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'interiors',
    title: 'Interiors',
    services: [
      { slug: 'full-home-interior', title: 'Full Home / Total Room Interior', desc: 'End-to-end residential interiors — concept to handover.', icon: Home },
      { slug: 'commercial-interior', title: 'Commercial Interior Projects', desc: 'Showrooms, offices, hotels and retail fit-outs.', icon: Briefcase },
      { slug: 'modular-kitchen', title: 'Modular Kitchen', desc: 'Smart storage, premium finishes, durable hardware.', icon: ChefHat },
      { slug: 'wardrobe', title: 'Wardrobe', desc: 'Custom sliding & openable wardrobes built to your space.', icon: Shirt },
      { slug: 'tv-unit', title: 'TV Unit', desc: 'Statement media walls with integrated storage.', icon: Tv },
      { slug: 'bed-bedroom', title: 'Bed & Bedroom Interior', desc: 'Beds, side units and complete bedroom styling.', icon: Bed },
    ],
  },
  {
    id: 'design',
    title: 'Design & Drawing',
    services: [
      { slug: '2d-drawing', title: '2D Drawing & Design', desc: 'Detailed floor plans, elevations and working drawings.', icon: PenTool },
      { slug: '3d-drawing', title: '3D Drawing & Visualisation', desc: 'Photorealistic 3D renders before a single nail is hammered.', icon: Box },
    ],
  },
  {
    id: 'ceiling-walls',
    title: 'Ceiling & Walls',
    services: [
      { slug: 'false-ceiling', title: 'False Ceiling', desc: 'Designer POP & gypsum ceilings with integrated lighting.', icon: Layers },
      { slug: 'pvc-ceiling', title: 'PVC Ceiling', desc: 'Waterproof, low-maintenance PVC ceiling solutions.', icon: Square },
      { slug: 'pvc-wall-panel', title: 'PVC Wall Panel', desc: 'Quick-install decorative wall panels in modern finishes.', icon: LayoutPanelTop },
      { slug: 'wallpaper', title: 'Wallpaper', desc: 'Premium imported & Indian wallpapers, expertly fitted.', icon: Wallpaper },
    ],
  },
  {
    id: 'windows-glass',
    title: 'Doors, Windows & Glass',
    services: [
      { slug: 'upvc-window', title: 'uPVC Window', desc: 'Weather-sealed, thermally efficient uPVC windows.', icon: AppWindow },
      { slug: 'aluminium-window', title: 'Aluminium Window', desc: 'Sleek aluminium frames for modern facades.', icon: Columns },
      { slug: 'tuffon-glass', title: 'Toughened Glass Work', desc: 'Tuffon glass partitions, railings and shopfronts.', icon: GlassWater },
    ],
  },
  {
    id: 'metal-exterior',
    title: 'Metal & Exterior',
    services: [
      { slug: 'acp-sheet', title: 'ACP Sheet Work', desc: 'Aluminium composite panel facades and signage.', icon: Sheet },
      { slug: 'steel-railing-gate', title: 'Steel Railing & Gate', desc: 'Custom MS / SS railings, gates and grills.', icon: Fence },
    ],
  },
  {
    id: 'flooring',
    title: 'Flooring',
    services: [
      { slug: 'wooden-flooring', title: 'Wooden Flooring', desc: 'Laminate, engineered and SPC wooden flooring.', icon: TreePine },
      { slug: '3d-epoxy-flooring', title: '3D Epoxy Flooring', desc: 'Seamless, high-gloss 3D epoxy floors for any space.', icon: Sparkles },
    ],
  },
]

export const allServices: Service[] = serviceCategories.flatMap(c => c.services)
