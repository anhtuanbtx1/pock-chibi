const fs = require('fs');
const path = require('path');

const hinduCards = [
  {
    name: "Brahma (The Creator - Lord of the Cosmos)",
    title: "Đấng Sáng Tạo Tối Cao - Đại Phạm Thiên Bốn Mặt",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/brahma.webp",
    meaning: "Đấng sáng tạo vũ trụ trong Tam Vị Nhất Thể Trimurti tối cao của Ấn Độ giáo. Ngài ngự trên tòa sen nở rộ, sở hữu bốn gương mặt nhìn thấu bốn phương trời càn khôn và bốn cánh tay cầm bộ kinh Veda thiêng liêng, bình nước thần Kamandalu, chuỗi hạt Akshamala và bông hoa sen biểu tượng cho trí tuệ sáng thế vô biên.",
    rarity: "Chí Tôn Sáng Thế Thần",
    element: "Brahma Sáng Thế · Tứ Diện Kinh Veda"
  },
  {
    name: "Vishnu (The Preserver & Guardian of Cosmic Order)",
    title: "Đấng Bảo Hộ Vũ Trụ - Chúa Tể Pháp Tắc Sanatana Dharma",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/vishnu.webp",
    meaning: "Đấng bảo hộ sự tồn vong và trật tự công lý của toàn cõi vũ trụ trong Trimurti. Thân khoác lụa vàng lộng lẫy, ngự trên lưng mãng xà nghìn đầu Shesha nổi trên đại dương sữa nguyên thủy Kshira Sagara. Ngài cầm trên tay bốn thần bảo tối thượng: tù và Shankha, đĩa luân Sudarshana Chakra, chùy Kaumodaki và đóa hoa sen Padme.",
    rarity: "Chí Tôn Hộ Trật Thần",
    element: "Sudarshana Luân Xa · Đại Dương Kshira Sagara"
  },
  {
    name: "Shiva (Mahadeva - The Destroyer & Transformer)",
    title: "Đại Thần Mahadeva - Chúa Tể Vũ Điệu Hủy Diệt & Tái Thiết",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/shiva.webp",
    meaning: "Vị thần tối cao Mahadeva trong Trimurti, đấng hủy diệt ảo ảnh (Maya) và tái tạo lại thế giới mới thanh tịnh. Ngài ngự trên đỉnh núi thiêng Kailash tuyết phủ, mang con mắt thứ ba thiêu rụi tà khí, quấn quanh cổ là vua rắn Vasuki, tay nắm đinh ba Trishula và trống Damaru tạo nhịp điệu cho vũ điệu vũ trụ thần thánh Tandava.",
    rarity: "Chí Tôn Hủy Diệt Thần",
    element: "Trishula Thần Ba · Vũ Điệu Vũ Trụ Tandava"
  },
  {
    name: "Saraswati (Goddess of Knowledge, Music & Wisdom)",
    title: "Đại Nữ Thần Tri Thức - Chúa Tể Âm Nhạc, Nghệ Thuật & Trí Tuệ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/saraswati.webp",
    meaning: "Nữ thần cao quý biểu trưng cho tri thức, học vấn, thi ca và nghệ thuật trong Tridevi, bạn đời của đấng sáng tạo Brahma. Nàng khoác tấm áo sari trắng tinh khôi tượng trưng cho tâm hồn thanh khiết, ngự trên bạch thiên nga Hamsa, đôi tay tấu lên những thanh âm nhiệm màu từ cây đàn Veena thiêng liêng khai mở trí tuệ muôn loài.",
    rarity: "Chí Tôn Trí Tuệ Mẫu Thần",
    element: "Bạch Liên Cầm Vận · Đàn Veena Giác Ngộ"
  },
  {
    name: "Lakshmi (Goddess of Fortune, Wealth & Prosperity)",
    title: "Cát Tường Đại Thiên Nữ - Nữ Thần Tài Lộc, Thịnh Vượng & May Mắn",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/lakshmi.webp",
    meaning: "Nữ thần của sự giàu sang, thịnh vượng, sắc đẹp và phúc lộc viên mãn trong Tridevi, người bạn đời vĩnh cửu của đấng bảo hộ Vishnu. Sinh ra từ cuộc khuấy biển sữa vĩ đại Samudra Manthan, ngài ngự trên đóa hồng liên rực rỡ, tay tuôn dòng vàng kim châu báu ban phát vận may vô lượng cho muôn cõi thế gian.",
    rarity: "Chí Tôn Cát Tường Mẫu Thần",
    element: "Kim Châu Như Ý · Hồng Liên Cát Tường"
  },
  {
    name: "Parvati (Goddess of Fertility, Love & Devotion)",
    title: "Thần Nữ Núi Thiêng - Hiện Thân Tình Yêu & Sức Mạnh Shakti",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/parvati.webp",
    meaning: "Con gái của vua núi tuyết Himavat, hiện thân tái sinh của nàng Sati và là người bạn đời thánh thiện, tận tụy của thần Shiva. Parvati là nguồn cội của năng lượng sáng tạo Shakti thiêng liêng nuôi dưỡng vạn vật, mẹ của chiến thần Kartikeya và thần trí tuệ Ganesha, sở hữu cả sự dịu dàng mẫu tử lẫn uy lực kinh thiên động địa.",
    rarity: "Chí Tôn Thánh Mẫu",
    element: "Tuyết Sơn Linh Khí · Tình Yêu Thần Thánh"
  },
  {
    name: "Adi Parashakti (The Supreme Cosmic Energy & Mother Goddess)",
    title: "Khởi Nguyên Vũ Trụ Năng Lượng - Tối Cao Mẫu Thần Đại Vũ Trụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chân Thần Nguyên Thủy & Tối Cao Shakti",
    image: "/assets/hindu/adi-parashakti.webp",
    meaning: "Thực thể năng lượng tối thượng nguyên thủy không giới hạn của toàn cõi vũ trụ trong phái Shaktism. Đấng sáng tạo, nuôi dưỡng và chuyển hóa muôn trùng thế giới trước cả khi thời gian bắt đầu. Mọi vị thần, kể cả Brahma, Vishnu hay Shiva đều sinh ra và vận hành nhờ nguồn linh lực thiêng liêng vô tận của ngài.",
    rarity: "Khởi Nguyên Tối Cao Thần",
    element: "Adi Shakti Vũ Trụ · Vạn Thần Khởi Nguyên"
  },
  {
    name: "Lalita Tripurasundari (The Empress of the Three Worlds)",
    title: "Tam Giới Nữ Hoàng - Tuyệt Sắc Tối Cao Thần Nữ Sri Vidya",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chân Thần Nguyên Thủy & Tối Cao Shakti",
    image: "/assets/hindu/lalita_tripurasundari.webp",
    meaning: "Hóa thân rực rỡ và lộng lẫy bậc nhất của Mẹ Vũ Trụ trong Mật tông Sri Vidya, người cai quản toàn bộ Tam Giới (Thiên giới, Địa giới và Minh giới). Ngự trên cỗ xe Sri Chakra kiêu hãnh, tay cầm cung mía thần thánh, năm mũi tên hoa ngũ sắc và dây thừng trói buộc tâm thức, ngài tỏa hào quang xóa tan mọi bóng tối vô minh.",
    rarity: "Chí Tôn Nữ Hoàng",
    element: "Sri Yantra Luân Xa · Tam Giới Thần Uy"
  },
  {
    name: "Ardhanarishvara (Half-Shiva Half-Parvati)",
    title: "Lưỡng Nghi Dung Hợp Thần - Đỉnh Cao Hợp Nhất Âm Dương Vũ Trụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/ardhanarishvara.webp",
    meaning: "Hiện thân hợp nhất thiêng liêng tuyệt mỹ giữa nửa bên phải là thần Shiva (nam tính - Purusha) và nửa bên trái là nữ thần Parvati (nữ tính - Prakriti). Biểu tượng tối cao của sự bất khả phân ly giữa năng lượng ý thức và năng lượng sáng tạo, chứng minh vũ trụ chỉ có thể sinh sôi viên mãn khi âm dương dung hợp làm một.",
    rarity: "Chí Tôn Lưỡng Nghi Thần",
    element: "Âm Dương Hợp Nhất · Purusha & Prakriti"
  },
  {
    name: "Harihara (The Composite Deity of Vishnu & Shiva)",
    title: "Dung Hợp Nhị Vị Thần - Đại Hiệp Nhất Bảo Hộ & Hủy Diệt",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/harihara.webp",
    meaning: "Hóa thân kết hợp tối cao giữa Hari (thần bảo hộ Vishnu) ở nửa bên trái và Hara (thần hủy diệt Shiva) ở nửa bên phải. Thể hiện triết lý sâu sắc rằng bảo tồn và hủy diệt chỉ là hai mặt của một thực thể tối cao duy nhất, mang đến sự hòa hợp tuyệt đối cho tín đồ của cả hai giáo phái Vaishnavism và Shaivism.",
    rarity: "Chí Tôn Dung Hợp Thần",
    element: "Đĩa Luân & Đinh Ba · Hài Hòa Vũ Trụ"
  },
  {
    name: "Dattatreya (The Supreme Guru & Combined Avatar of Trimurti)",
    title: "Đại Đạo Sư Tam Vị Nhất Thể - Bậc Giác Ngộ Tối Thượng Vũ Trụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/dattatreya.webp",
    meaning: "Bậc thầy đạo sư giác ngộ vĩ đại, hiện thân đồng quy hợp nhất của cả ba đấng tối cao Brahma, Vishnu và Shiva sinh ra từ hiền giả Atri và nàng Anasuya. Mang ba đầu uy nghiêm, ngài dắt theo bốn chú chó tượng trưng cho bốn bộ kinh Veda thiêng liêng và một chú bò Kamadhenu ban mọi điều ước cho những người tìm kiếm chân lý.",
    rarity: "Chí Tôn Đạo Sư Thần",
    element: "Tam Đầu Giác Ngộ · Tứ Bộ Veda Thiêng"
  },
  {
    name: "Matsya (The Fish Avatar of Lord Vishnu)",
    title: "Ngư Thần Khởi Nguyên Avatar - Cứu Tinh Đại Hồng Thủy Vĩ Đại",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/matsya.webp",
    meaning: "Hóa thân Avatar đầu tiên trong mười kiếp giáng trần Dashavatara của thần Vishnu dưới hình hài một chú cá vàng khổng lồ có sừng. Matsya đã dẫn dắt con thuyền của vua Manu vượt qua trận đại hồng thủy diệt thế kinh hoàng, tiêu diệt ác quỷ Hayagriva để đoạt lại và bảo tồn nguyên vẹn bốn bộ kinh Veda cho kỷ nguyên mới.",
    rarity: "Huyền Thoại Khởi Nguyên Avatar",
    element: "Ngư Thần Đại Hồng Thủy · Kinh Veda Bất Diệt"
  }
];

// Assign IDs: HD-01 to HD-12
const cardsWithIds = hinduCards.map((card, idx) => {
  const num = String(idx + 1).padStart(2, '0');
  return {
    id: `HD-${num}`,
    ...card
  };
});

// Verify all image paths exist on disk
cardsWithIds.forEach(card => {
  const diskPath = path.join('public', card.image.replace(/^\//, ''));
  if (!fs.existsSync(diskPath)) {
    console.error(`ERROR: Image not found for ${card.name}: ${diskPath}`);
    process.exit(1);
  }
});

// Write hindu.json
const hinduFilePath = path.join('src', 'data', 'chibi', 'hindu.json');
fs.writeFileSync(hinduFilePath, JSON.stringify(cardsWithIds, null, 2), 'utf-8');
console.log(`Created ${hinduFilePath} with ${cardsWithIds.length} characters.`);

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
  'hindu'
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

