import {
  IconClipboard, IconCopy, IconLayoutDashboard, IconReceipt,
  IconReceipt2,
  IconTableOptions,
  IconUserStar,
  type TablerIconsProps
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems: Item[] = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Cajas',
  },
  {
    id: uniqueId(),
    title: 'Cajas',
    icon: IconReceipt2,
    href: '/dinings',
  },
  {
    navlabel: true,
    subheader: 'Becas',
  },
  {
    id: uniqueId(),
    title: 'Catalogo de becas',
    icon: IconTableOptions,
    href: '/scholarships',
  },
  {
    id: uniqueId(),
    title: 'Solicitudes de beca',
    icon: IconClipboard,
    href: '/scholarship-requests',
  },
  {
    id: uniqueId(),
    title: 'Estudiantes becados',
    icon: IconUserStar,
    href: '/scholarship-students',
  },
  {
    navlabel: true,
    subheader: 'Reportes',
  },
  {
    id: uniqueId(),
    title: 'Reportes de caja',
    icon: IconReceipt,
    href: '/reports',
  },
  {
    id: uniqueId(),
    title: 'Asistencias',
    icon: IconCopy,
    href: '/assistances',
  }
];

export interface Item {
  id?: number | string,
  title?: string,
  icon?: ((props: TablerIconsProps) => JSX.Element),
  href?: string,
  external?: boolean,
  disabled?: boolean,
  navlabel?: boolean,
  subheader?: string
}

export default Menuitems;
