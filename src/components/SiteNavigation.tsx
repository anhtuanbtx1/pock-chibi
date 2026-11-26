'use client';

import {
  BookOpen,
  Compass,
  Flame,
  Layers,
  Shield,
  Sparkles,
  Swords,
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
        title: 'Thần thoại',
        items: [
          {
            label: 'Thần thoại & Tiên giới',
            description: 'Chư thần, Bồ Tát & tiên nhân',
            href: galleryHref('THẦN THOẠI & TIÊN GIỚI'),
            icon: Sparkles,
          },
          {
            label: 'Tây Du & Minh giới',
            description: 'Thầy trò Đường Tăng & yêu ma',
            href: galleryHref('TÂY DU & MINH GIỚI'),
            icon: Flame,
          },
          {
            label: 'Thần thoại Hy Lạp',
            description: '27 vị thần & anh hùng Hy Lạp',
            href: galleryHref('THẦN THOẠI HY LẠP'),
            icon: Zap,
          },
          {
            label: 'Thần thoại Ấn Độ',
            description: '132 thần linh & sử thi Hindu',
            href: galleryHref('THẦN THOẠI ẤN ĐỘ'),
            icon: Sparkles,
          },
          {
            label: 'Kinh dị & Ma quỷ',
            description: '13 ác linh & sát nhân huyền thoại',
            href: galleryHref('KINH DỊ & MA QUỶ'),
            icon: Flame,
          },
        ],
      },
      {
        title: 'Sử thi & Võ hiệp',
        items: [
          {
            label: 'Thần thoại Việt Nam',
            description: 'Hào kiệt & truyền thuyết Việt',
            href: galleryHref('THẦN THOẠI VIỆT NAM'),
            icon: Users,
          },
          {
            label: 'Tam Quốc Chí',
            description: 'Danh tướng thời Tam Quốc',
            href: galleryHref('TAM QUỐC CHÍ'),
            icon: Shield,
          },
          {
            label: 'Võ lâm Kim Dung',
            description: 'Quần hùng & tuyệt học võ lâm',
            href: galleryHref('VÕ LÂM KIM DUNG'),
            icon: Compass,
          },
          {
            label: 'Manga & Anime',
            description: 'Nhân vật biểu tượng Nhật Bản',
            href: galleryHref('MANGA & ANIME'),
            icon: BookOpen,
          },
        ],
      },
      {
        title: 'Đấu trường game',
        items: [
          {
            label: 'Liên Quân Mobile',
            description: '124 vị tướng Athanor',
            href: galleryHref('LIÊN QUÂN MOBILE'),
            icon: Swords,
          },
          {
            label: 'Liên Minh Huyền Thoại',
            description: 'Các vị tướng Runeterra',
            href: galleryHref('LIÊN MINH HUYỀN THOẠI'),
            icon: Zap,
          },
          {
            label: 'Dota 2',
            description: 'Hero Radiant & Dire',
            href: galleryHref('DOTA 2'),
            icon: Shield,
          },
          {
            label: 'Street Fighter',
            description: '52 đấu sĩ đường phố Capcom',
            href: galleryHref('STREET FIGHTER'),
            icon: Flame,
          },
        ],
      },
      {
        title: 'Anh hùng & Võ đài',
        items: [
          {
            label: 'Vũ trụ Marvel (MCU)',
            description: '162 anh hùng & ác nhân Marvel',
            href: galleryHref('VŨ TRỤ MARVEL'),
            icon: Sparkles,
          },
          {
            label: 'Vũ trụ DC (DCU)',
            description: '163 anh hùng & ác nhân DC',
            href: galleryHref('VŨ TRỤ DC'),
            icon: Shield,
          },
          {
            label: 'Huyền thoại WWE',
            description: 'Các biểu tượng võ đài',
            href: galleryHref('HUYỀN THOẠI WWE'),
            icon: Trophy,
          },
          {
            label: 'Huyền thoại thể thao',
            description: 'Ngôi sao sân đấu & võ đài',
            href: galleryHref('HUYỀN THOẠI THỂ THAO'),
            icon: Trophy,
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
