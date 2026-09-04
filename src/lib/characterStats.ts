import { ChibiCard, CharacterStats } from '@/components/TarotBookPopup';

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function containsAny(text: string, words: string[]): boolean {
  const lower = text.toLowerCase();
  return words.some(w => lower.includes(w));
}

/**
 * Calculates character martial attributes dynamically and deterministically
 * based on rarity, class archetype, element, faction, and lore keywords.
 */
export function getCharacterStats(card: ChibiCard | null | undefined): CharacterStats {
  if (!card) {
    return {
      congLuc: '999+',
      phongNgu: '980+',
      thanPhap: '960+',
      linhLuc: 'MAX',
    };
  }

  // If card has explicit custom stats in data, honor them
  if (card.stats) {
    return {
      congLuc: String(card.stats.congLuc ?? '999+'),
      phongNgu: String(card.stats.phongNgu ?? '980+'),
      thanPhap: String(card.stats.thanPhap ?? '960+'),
      linhLuc: String(card.stats.linhLuc ?? 'MAX'),
    };
  }

  const hash = hashString((card.id || '') + '_' + (card.name || ''));
  const seed1 = hash % 31;
  const seed2 = Math.floor(hash / 31) % 29;
  const seed3 = Math.floor(hash / (31 * 29)) % 23;
  const seed4 = Math.floor(hash / 17) % 19;

  const rarity = (card.rarity || '').toLowerCase();
  const fullText = `${card.name || ''} ${card.title || ''} ${card.faction || ''} ${card.element || ''} ${card.meaning || ''}`.toLowerCase();

  // Baseline scaled by rarity tier
  let baseOverall = 840;
  let isTopTier = false;

  if (
    rarity.includes('chí tôn') ||
    rarity.includes('thần thoại') ||
    rarity.includes('quốc tổ') ||
    rarity.includes('quốc mẫu') ||
    rarity.includes('thánh nhân') ||
    rarity.includes('vô địch') ||
    rarity.includes('đạo tổ') ||
    rarity.includes('phật tổ') ||
    rarity.includes('thiên đế') ||
    rarity.includes('đô vật') ||
    rarity.includes('bá vương') ||
    rarity.includes('ẩn tổ') ||
    rarity.includes('địa tiên') ||
    rarity.includes('ma thần') ||
    rarity.includes('viêm đế')
  ) {
    baseOverall = 950;
    isTopTier = true;
  } else if (
    rarity.includes('truyền thuyết') ||
    rarity.includes('kim tiên') ||
    rarity.includes('long vương') ||
    rarity.includes('đại sĩ') ||
    rarity.includes('quân thần') ||
    rarity.includes('tông sư') ||
    rarity.includes('chiến hồn') ||
    rarity.includes('chiến thần') ||
    rarity.includes('lucha') ||
    rarity.includes('hardcore') ||
    rarity.includes('tinh quân')
  ) {
    baseOverall = 910;
  } else if (
    rarity.includes('huyền thoại') ||
    rarity.includes('hoàng kim') ||
    rarity.includes('dũng sĩ') ||
    rarity.includes('tiên tướng') ||
    rarity.includes('thiên tướng') ||
    rarity.includes('thần tướng') ||
    rarity.includes('danh tướng')
  ) {
    baseOverall = 870;
  }

  // Category flavor
  if (card.category === 'wwe') {
    baseOverall += 15;
  }

  // Archetype traits
  const isStrategist = containsAny(fullText, [
    'quân sư', 'mưu', 'khổng minh', 'kỳ mưu', 'bát trận', 'ngọa long', 'phụng sồ', 'tư mã', 'chu du', 'thừa tướng', 'học giả'
  ]);
  const isWarrior = containsAny(fullText, [
    'chiến thần', 'mãnh tướng', 'vô song', 'lữ bố', 'quan vũ', 'trương phi', 'triệu vân', 'mã siêu', 'hoàng trung',
    'kiếm ma', 'cầu bại', 'bá vương', 'hình thiên', 'tôn ngộ không', 'ngộ không', 'đại thánh', 'hạng vũ',
    'john cena', 'cena', 'batista', 'animal', 'đô vật', 'vô địch thế giới', 'hạng nặng',
    'stone cold', 'austin', 'triple h', 'the game', 'king of kings', 'pedigree', 'stunner',
    'hạ hầu đôn', 'hạ hầu uyên', 'thạch hạo', 'hoang thiên đế', 'bạt tiễn'
  ]);
  const isDefender = containsAny(fullText, [
    'thái cực', 'kim cang', 'huyền vũ', 'bất hoại', 'hộ thể', 'sa tăng', 'điển vi', 'hứa chử', 'thiếu lâm', 'bát giới', 'phòng thủ', 'hộ pháp', 'cơ bắp',
    'hậu khanh', 'cương thi', 'bất tử'
  ]);
  const isAgile = containsAny(fullText, [
    'phong thần', 'cước', 'lăng ba', 'cân đẩu vân', 'khinh công', 'điêu', 'bằng', 'thần hành', 'vi nhất tiếu', 'nhiếp phong', 'đoàn dự', 'lôi chấn tử',
    'rey mysterio', 'mysterio', '619', 'lucha', 'nhào lộn',
    'rob van dam', 'rvd', 'frog splash', 'van daminator', 'thần tiễn', 'diệu tài', 'thần tốc ngàn dặm'
  ]);
  const isMageOrDeity = containsAny(fullText, [
    'phật', 'bồ tát', 'đạo tổ', 'thiên tôn', 'tiên', 'thần thông', 'pháp bảo', 'âm dương', 'cửu dương', 'bắc minh', 'ngọc hoàng', 'như lai',
    'bồ đề tổ sư', 'tu bồ đề', 'trấn nguyên', 'địa tiên', 'tụ lý càn khôn', 'thông thiên', 'tru tiên', 'xích cước', 'mão nhật', 'thái dương',
    'tiêu viêm', 'viêm đế', 'dị hỏa', 'phật nộ hỏa liên'
  ]);

  let atkMod = 0;
  let defMod = 0;
  let spdMod = 0;
  let spiMod = 0;

  if (isWarrior) {
    atkMod += 35;
    defMod += 10;
    spdMod += 15;
    spiMod -= 10;
  }
  if (isStrategist) {
    atkMod -= 35;
    defMod -= 20;
    spdMod += 10;
    spiMod += 45;
  }
  if (isDefender) {
    defMod += 40;
    atkMod -= 10;
  }
  if (isAgile) {
    spdMod += 40;
  }
  if (isMageOrDeity) {
    spiMod += 40;
  }

  let atk = baseOverall + atkMod + seed1;
  let def = baseOverall - 10 + defMod + seed2;
  let spd = baseOverall - 10 + spdMod + seed3;
  let spi = baseOverall + spiMod + seed4;

  atk = Math.min(999, Math.max(750, atk));
  def = Math.min(999, Math.max(750, def));
  spd = Math.min(999, Math.max(750, spd));
  spi = Math.min(999, Math.max(750, spi));

  const congLuc = atk >= 990 || (isWarrior && isTopTier) ? '999+' : `${atk}+`;
  const phongNgu = def >= 990 || (isDefender && isTopTier) ? '990+' : `${def}+`;
  const thanPhap = spd >= 990 || (isAgile && isTopTier) ? '990+' : `${spd}+`;

  let linhLuc: string;
  if ((isTopTier && isMageOrDeity) || (isStrategist && isTopTier) || spi >= 985) {
    linhLuc = 'MAX';
  } else if (spi >= 950) {
    linhLuc = '980+';
  } else if (spi >= 900) {
    linhLuc = '950+';
  } else {
    linhLuc = `${spi}+`;
  }

  return {
    congLuc,
    phongNgu,
    thanPhap,
    linhLuc,
  };
}
