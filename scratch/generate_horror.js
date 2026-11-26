const fs = require('fs');
const path = require('path');

const horrorCharacters = [
  {
    name: "Count Dracula (Lord of Vampires)",
    title: "Bá Tước Ma Cà Rồng - Chúa Tể Bóng Đêm Transylvania",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Ác Quỷ Siêu Nhiên & Địa Ngục Cổ Xưa",
    image: "/assets/horror/dracula.webp",
    meaning: "Vị quý tộc ma cà rồng bất tử quyền năng bậc nhất văn hóa kinh dị thế giới, ngự trị tại tòa lâu đài cổ u ám vùng Transylvania. Sở hữu sức mạnh siêu nhiên vượt trội, khả năng biến hình thành dơi, sói hay sương mù, thôi miên tâm trí nạn nhân và trường sinh bất lão qua hàng thế kỷ bằng huyết dịch.",
    rarity: "Chí Tôn Huyết Tổ",
    element: "Huyết Tộc Bất Tử · Dạ Ảnh Transylvania"
  },
  {
    name: "Pennywise (It - The Dancing Clown)",
    title: "Hề Ma Bóng Tối - Thực Thể Ác Mộng Cổ Xưa Từ Deadlights",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Ác Quỷ Siêu Nhiên & Địa Ngục Cổ Xưa",
    image: "/assets/horror/pennywise.webp",
    meaning: "Thực thể vũ trụ cổ xưa và tàn ác tồn tại trước khi thời gian bắt đầu, thường hóa thân thành chú hề nhảy múa với quả bóng bay đỏ rực tại thị trấn Derry. Hắn thức tỉnh theo chu kỳ 27 năm một lần, biến hóa thành nỗi sợ hãi sâu thẳm nhất của từng nạn nhân để săn mồi và nuôi dưỡng cơn đói vô tận.",
    rarity: "Chí Tôn Ác Mộng Cổ Thần",
    element: "Ánh Sáng Tử Thần Deadlights · Huyễn Ảnh Kinh Hoàng"
  },
  {
    name: "Freddy Krueger (The Springwood Slasher)",
    title: "Ác Quỷ Giấc Mơ - Chúa Tể Cõi Mộng Kinh Hoàng Phố Elm",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Sát Nhân Kinh Điển & Bóng Đêm Slasher",
    image: "/assets/horror/freddy-krueger.webp",
    meaning: "Con quỷ cõi mộng mang khuôn mặt bỏng sẹo, chiếc áo len sọc đỏ xanh và găng tay bốn lưỡi dao sắc lẹm. Freddy xâm nhập vào giấc ngủ của con mồi, biến thế giới giấc mơ thành lãnh địa bất khả chiến bại nơi hắn nắm giữ quyền năng bẻ cong thực tại—bất kỳ vết thương nào trong mơ đều trở thành cái chết ngoài đời thực.",
    rarity: "Chí Tôn Ác Mộng Ma",
    element: "Mộng Yểm Địa Ngục · Thiết Trảo Đoạt Hồn"
  },
  {
    name: "Jason Voorhees (Terror of Crystal Lake)",
    title: "Bất Tử Hồ Pha Lê - Chiến Binh Mặt Nạ Khúc Côn Cầu Hủy Diệt",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Sát Nhân Kinh Điển & Bóng Đêm Slasher",
    image: "/assets/horror/jason-voorhees.webp",
    meaning: "Sát nhân bất tử gắn liền với chiếc mặt nạ thủ môn hockey nhuốm máu và thanh mã tấu khổng lồ tại khu cắm trại Hồ Pha Lê. Dù bị bắn, thiêu rụi hay chôn vùi, Jason luôn hồi sinh từ cõi chết với sức mạnh thể chất quái vật không thể ngăn cản, càn quét không khoan nhượng bất cứ kẻ nào xâm phạm lãnh địa của hắn.",
    rarity: "Chí Tôn Bất Tử Sát Nhân",
    element: "Bất Hoại Cương Thi · Mã Tấu Hồ Pha Lê"
  },
  {
    name: "Michael Myers (The Shape)",
    title: "Bóng Hình Đêm Halloween - Hiện Thân Thuần Khiết Của Cái Ác",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Sát Nhân Kinh Điển & Bóng Đêm Slasher",
    image: "/assets/horror/michael-myers.webp",
    meaning: "Huyền thoại mở đầu kỷ nguyên phim chặt chém hiện đại, mang chiếc mặt nạ trắng vô hồn lạnh lẽo và bộ đồ thợ máy tối màu. Không nói một lời, không cảm xúc hay động cơ, Michael Myers di chuyển chậm rãi nhưng luôn xuất hiện ngay sau lưng nạn nhân với sức bền siêu nhiên và con dao bếp sắc lạnh đêm Halloween.",
    rarity: "Chí Tôn Huyền Thoại Sát Nhân",
    element: "Thuần Khiết Tà Ác · Bóng Đêm Halloween"
  },
  {
    name: "Pinhead (The Hell Priest - Cenobite Leader)",
    title: "Lãnh Chúa Địa Ngục Cenobite - Người Gác Cổng Hộp Nhạc Lament",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Ác Quỷ Siêu Nhiên & Địa Ngục Cổ Xưa",
    image: "/assets/horror/pinhead.webp",
    meaning: "Thủ lĩnh lạnh lùng và uy nghiêm của hội ác linh Cenobite đến từ chiều không gian Leviathan, với những chiếc đinh sắt cắm đối xứng trên đầu. Bất cứ ai giải mã khối lập phương ma thuật Lament Configuration đều mở ra cánh cổng triệu hồi Pinhead cùng những sợi xích móc sắt trói buộc linh hồn vào cực hình vĩnh viễn.",
    rarity: "Chí Tôn Ma Vương",
    element: "Xiềng Xích Địa Ngục · Lập Phương Lament"
  },
  {
    name: "Valak (Marquis of Hell - The Profane)",
    title: "Hầu Tước Địa Ngục Valak - Ác Quỷ Bóng Tối Tối Thượng",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Ác Quỷ Siêu Nhiên & Địa Ngục Cổ Xưa",
    image: "/assets/horror/valak.webp",
    meaning: "Một trong những đại ác quỷ quyền năng nhất trong sách cổ Ars Goetia, thống lĩnh ba mươi quân đoàn ma quỷ dưới địa ngục. Thâm độc, xảo quyệt và mang sức mạnh nguyền rủa tàn bạo, Valak lợi dụng nỗi sợ hãi và niềm tin tôn giáo để gieo rắc bóng tối, chỉ có thể bị chế ngự khi kẻ trừ tà đọc đúng chân danh thật sự của hắn.",
    rarity: "Chí Tôn Đại Ác Quỷ",
    element: "Hắc Ám Địa Ngục · Lời Nguyền Chân Danh"
  },
  {
    name: "The Nun (Demon Nun of Cârța)",
    title: "Ma Sơ Bóng Tối - Hiện Thân Kinh Hoàng Tu Viện Cổ Romania",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Ác Quỷ Siêu Nhiên & Địa Ngục Cổ Xưa",
    image: "/assets/horror/the-nun.webp",
    meaning: "Hình hài ma sơ mặc áo choàng đen với gương mặt trắng bệch và đôi mắt vàng rực lóe sáng trong bóng tối nhà thờ cổ Cârța. Bóng dáng rùng rợn bước ra từ bức tranh tường nguyền rủa làm xoay chuyển mọi cây thánh giá, biến nơi linh thiêng nhất thành địa ngục trần gian đầy tiếng thì thầm ma mị.",
    rarity: "Huyền Thoại Ác Linh",
    element: "Tu Viện Nguyền Rủa · Bóng Ma Tà Đạo"
  },
  {
    name: "Chucky (The Good Guy Killer Doll)",
    title: "Búp Bê Sát Nhân Chucky - Linh Hồn Tà Đạo Voodoo Bất Tử",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Búp Bê Ám Ảnh & Trò Chơi Tử Thần",
    image: "/assets/horror/chucky.webp",
    meaning: "Tên sát nhân khét tiếng Charles Lee Ray đã sử dụng tà thuật Voodoo của Damballa để chuyển linh hồn mình vào thân xác con búp bê tóc đỏ Good Guy trước lúc chết. Ẩn sau vẻ ngoài đồ chơi trẻ em là bản tính tàn độc, ranh ma, miệng cười man rợ với con dao sắc lẹm luôn rình rập chiếm đoạt thể xác mới.",
    rarity: "Huyền Thoại Lời Nguyền",
    element: "Tà Thuật Voodoo Damballa · Búp Bê Ma Ám"
  },
  {
    name: "Ghostface (The Scream Killer)",
    title: "Bóng Ma Mặt Nạ Khóc - Ác Mộng Cuộc Gọi Đêm Khuya Woodsboro",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Sát Nhân Kinh Điển & Bóng Đêm Slasher",
    image: "/assets/horror/ghostface.webp",
    meaning: "Sát nhân bí ẩn khoác áo choàng đen rách rưới và chiếc mặt nạ trắng méo mó lấy cảm hứng từ bức tranh 'Tiếng Thét'. Trước khi ra tay với con dao săn Buck 120, Ghostface luôn đùa giỡn nạn nhân qua điện thoại bằng giọng nói trầm khàn ám ảnh với câu hỏi kinh điển đầy chết chóc.",
    rarity: "Huyền Thoại Sát Nhân",
    element: "Bóng Ma Áo Choàng · Lưỡi Dao Đêm Khuya"
  },
  {
    name: "Leatherface (The Chainsaw Massacrer)",
    title: "Quái Vật Cưa Máy Texas - Kẻ Đeo Mặt Nạ Da Người Kinh Hoàng",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Sát Nhân Kinh Điển & Bóng Đêm Slasher",
    image: "/assets/horror/leatherface.webp",
    meaning: "Kẻ đồ tể khổng lồ và tàn bạo sinh sống tại trang trại hẻo lánh vùng Texas, nổi tiếng với chiếc mặt nạ khâu từ da người và tiếng gầm rú điên loạn của chiếc cưa máy khổng lồ. Với thân hình hộ pháp và bản năng cuồng sát man rợ, hắn là cơn ác mộng kinh hoàng nhất đối với mọi du khách lỡ lạc bước vào vùng đất chết.",
    rarity: "Huyền Thoại Đồ Tể",
    element: "Cưa Máy Cuồng Nộ · Ám Ảnh Miền Texas"
  },
  {
    name: "Jigsaw (John Kramer - The Trap Master)",
    title: "Bậc Thầy Cạm Bẫy Jigsaw - Người Tổ Chức Trò Chơi Sinh Tồn",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Búp Bê Ám Ảnh & Trò Chơi Tử Thần",
    image: "/assets/horror/jigsaw.webp",
    meaning: "Kiến trúc sư thiên tài của những cỗ máy tử thần kinh hoàng cùng hình nhân Billy cưỡi xe ba bánh với nụ cười ma quái. Không trực tiếp ra tay sát hại, Jigsaw đẩy những kẻ vô cảm vào chuỗi thử thách khắc nghiệt buộc họ phải đánh đổi máu thịt để trân trọng giá trị của sự sống.",
    rarity: "Huyền Thoại Tâm Lý Tử Thần",
    element: "Cơ Khí Tử Thần · Trò Chơi Sinh Tử"
  },
  {
    name: "Dr. Hannibal Lecter (The Cannibal Genius)",
    title: "Bác Sĩ Tâm Thần Ăn Thịt Người - Thiên Tài Tội Phạm Lịch Lãm",
    category: "horror",
    categoryLabel: "Kinh Dị & Ma Quỷ",
    faction: "Búp Bê Ám Ảnh & Trò Chơi Tử Thần",
    image: "/assets/horror/hannibal.webp",
    meaning: "Bác sĩ tâm thần xuất chúng sở hữu trí tuệ siêu việt, phong thái quý tộc lịch lãm nhưng lại là tên sát nhân ăn thịt người lạnh lùng tàn nhẫn bậc nhất. Ngồi sau lớp kính phòng giam với chiếc mặt nạ rọ mõm biểu tượng, chỉ bằng vài lời phân tích tâm lý sắc bén, Hannibal có thể thao túng tâm trí và phá hủy lý trí của bất kỳ ai đối diện.",
    rarity: "Chí Tôn Thiên Tài Tội Phạm",
    element: "Thao Túng Tâm Trí · Khẩu Trang Tử Thần"
  }
];

// Verify all image paths exist on disk
horrorCharacters.forEach(c => {
  const diskPath = path.join('public', c.image.replace(/^\//, ''));
  if (!fs.existsSync(diskPath)) {
    console.error(`ERROR: Image not found for ${c.name}: ${diskPath}`);
    process.exit(1);
  }
});

// Assign IDs: HR-01 to HR-13
const cardsWithIds = horrorCharacters.map((c, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  return {
    id: `HR-${num}`,
    ...c
  };
});

// Write src/data/chibi/horror.json
const horrorFilePath = path.join('src', 'data', 'chibi', 'horror.json');
fs.writeFileSync(horrorFilePath, JSON.stringify(cardsWithIds, null, 2), 'utf-8');
console.log(`Created ${horrorFilePath} with ${cardsWithIds.length} characters.`);

// Rebuild all_chibi.json
const allCategories = [
  'than_gioi',
  'tay_du',
  'ma_gioi',
  'viet_nam',
  'tam_quoc',
  'kim_dung',
  'phong_van',
  'wwe',
  'manga_anime',
  'the_thao',
  'lien_minh',
  'lien_quan',
  'dota',
  'street_fighter',
  'greek',
  'hindu',
  'mcu',
  'dcu',
  'horror'
];

let allCards = [];
for (const cat of allCategories) {
  const filePath = path.join('src', 'data', 'chibi', `${cat}.json`);
  if (fs.existsSync(filePath)) {
    const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allCards = allCards.concat(list);
    console.log(`- ${cat}: ${list.length} cards`);
  } else {
    console.error(`Missing file: ${filePath}`);
    process.exit(1);
  }
}

const allChibiFilePath = path.join('src', 'data', 'chibi', 'all_chibi.json');
fs.writeFileSync(allChibiFilePath, JSON.stringify(allCards, null, 2), 'utf-8');
console.log(`\nSuccessfully updated ${allChibiFilePath} with total: ${allCards.length} cards!`);
