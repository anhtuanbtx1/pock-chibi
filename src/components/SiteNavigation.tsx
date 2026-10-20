'use client';

import {
  BookOpen,
  Compass,
  Flame,
  Layers,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import {
  DropdownNavigation,
  type DropdownNavigationItem,
} from '@/components/ui/dorpdown-navigation';

const galleryHref = (tab: string) => `/gallery?tab=${encodeURIComponent(tab)}`;

const NAV_ITEMS: DropdownNavigationItem[] = [
  {
    id: 1,
    label: 'Khám phá',
    subMenus: [
      {
        title: 'Không gian',
        items: [
          {
            label: 'Sân khấu thẻ 3D',
            description: 'Xoay và khám phá thẻ nổi bật',
            href: '/',
            icon: Sparkles,
          },
          {
            label: 'Toàn bộ thư viện',
            description: 'Duyệt toàn bộ bộ sưu tập Chibi',
            href: galleryHref('SEE ALL'),
            icon: Layers,
          },
          {
            label: 'Phiên bản đặc biệt',
            description: 'Những nhân vật có nhiều biến thể',
            href: galleryHref('SPECIAL ART'),
            icon: BookOpen,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Chủ đề',
    subMenus: [
      {
        title: 'Thần thoại & võ hiệp',
        items: [
          {
            label: 'Thần thoại & Tiên giới',
            description: 'Chư thần, Bồ Tát và tiên nhân',
            href: galleryHref('THẦN THOẠI & TIÊN GIỚI'),
            icon: Sparkles,
          },
          {
            label: 'Tây Du & Minh giới',
            description: 'Thầy trò Đường Tăng và yêu ma',
            href: galleryHref('TÂY DU & MINH GIỚI'),
            icon: Flame,
          },
          {
            label: 'Tam Quốc Chí',
            description: 'Danh tướng thời Tam Quốc',
            href: galleryHref('TAM QUỐC CHÍ'),
            icon: Shield,
          },
          {
            label: 'Võ lâm Kim Dung',
            description: 'Quần hùng và tuyệt học võ lâm',
            href: galleryHref('VÕ LÂM KIM DUNG'),
            icon: Compass,
          },
        ],
      },
      {
        title: 'Đấu trường game',
        items: [
          {
            label: 'Liên Minh Huyền Thoại',
            description: 'Các vị tướng khắp Runeterra',
            href: galleryHref('LIÊN MINH HUYỀN THOẠI'),
            icon: Zap,
          },
          {
            label: 'Dota 2',
            description: 'Hero Radiant và Dire huyền thoại',
            href: galleryHref('DOTA 2'),
            icon: Shield,
          },
          {
            label: 'Huyền thoại WWE',
            description: 'Các biểu tượng của võ đài',
            href: galleryHref('HUYỀN THOẠI WWE'),
            icon: Trophy,
          },
        ],
      },
      {
        title: 'Văn hóa đại chúng',
        items: [
          {
            label: 'Manga & Anime',
            description: 'Nhân vật biểu tượng Nhật Bản',
            href: galleryHref('MANGA & ANIME'),
            icon: BookOpen,
          },
          {
            label: 'Huyền thoại thể thao',
            description: 'Ngôi sao sân đấu và võ đài',
            href: galleryHref('HUYỀN THOẠI THỂ THAO'),
            icon: Trophy,
          },
          {
            label: 'Thần thoại Việt Nam',
            description: 'Hào kiệt và truyền thuyết Việt',
            href: galleryHref('THẦN THOẠI VIỆT NAM'),
            icon: Users,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: 'Thư viện',
    href: galleryHref('SEE ALL'),
  },
];

export default function SiteNavigation() {
  return <DropdownNavigation navItems={NAV_ITEMS} />;
}
