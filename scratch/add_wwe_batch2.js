const fs = require('fs');
const path = require('path');

const newCharacters = [
  {
    id: "WWE-44",
    name: "AJ Styles (The Phenomenal One)",
    title: "Ngôi Sao Phi Thường - 2 Lần Vô Địch WWE Thế Giới",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The O.C. · The Phenomenal One",
    image: "/assets/aj-styles.webp",
    meaning: "Võ sĩ tài năng toàn diện bậc nhất hành tinh với kỹ năng sàn đấu đỉnh cao, được mệnh danh là 'The Phenomenal One' và là linh hồn thống lĩnh nhóm The O.C. Nổi tiếng khắp thế giới với cú lộn người qua dây đài tuyệt đỉnh 'Phenomenal Forearm', tuyệt chiêu bẻ khớp cắm mặt hủy diệt 'Styles Clash' cùng thế khóa bẻ chân kinh điển 'Calf Crusher'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Styles Clash · Phenomenal Forearm · Calf Crusher"
  },
  {
    id: "WWE-45",
    name: "Big E (The Powerhouse)",
    title: "Sức Mạnh Cơ Bắp The New Day - WWE Champion",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The New Day · Power of Positivity",
    image: "/assets/big-e.webp",
    meaning: "Cỗ máy sức mạnh hộ pháp và là linh hồn năng lượng của nhóm The New Day, cựu vô địch WWE Championship thế giới với nụ cười sảng khoái và tinh thần lạc quan bùng nổ. Sở hữu những cú quăng ngã Belly-to-Belly Suplex rung chuyển võ đài, cú lao người Spear liều mạng qua dây đài và tuyệt kỹ nhấc bổng vai dội sàn sấm sét 'Big Ending'.",
    rarity: "Hoàng Kim Đô Vật",
    element: "Big Ending · Belly-to-Belly Suplex · New Day Rocks"
  },
  {
    id: "WWE-46",
    name: "Bray Wyatt (The Fiend)",
    title: "Kẻ Thao Túng Tâm Trí - Cơn Ác Mộng The Fiend",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Wyatt Family · Firefly Fun House",
    image: "/assets/bray-wyatt.webp",
    meaning: "Thiên tài kể chuyện ma mị và bí ẩn bậc nhất lịch sử hiện đại với chiếc đèn lồng soi rọi bóng tối, cựu vô địch WWE & Universal Champion. Biến hóa giữa người kể chuyện Windham dị biệt và ác quỷ bất tử mang mặt nạ da người 'The Fiend', gieo rắc kinh hoàng bằng điệu bò nhện rợn gáy, tuyệt chiêu bẻ cổ 'Sister Abigail' và thế khóa nghẹt thở 'Mandible Claw'.",
    rarity: "Truyền Thuyết Dị Giáo",
    element: "Sister Abigail · Mandible Claw · Let Me In"
  },
  {
    id: "WWE-47",
    name: "Bret Hart (The Hitman)",
    title: "Bậc Thầy Kỹ Thuật Võ Đài - The Excellence of Execution",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Hart Foundation · Canadian Excellence",
    image: "/assets/bret-hart.webp",
    meaning: "Huyền thoại vĩ đại người Canada thuộc dòng tộc Hart danh giá, người được ca tụng với câu nói bất hủ 'The best there is, the best there was, and the best there ever will be'. Nổi danh với cặp kính hồng sắc sảo, kỹ thuật khóa siết chuẩn xác đến từng milimet và tuyệt kỹ bẻ ngược chân kinh điển bậc nhất lịch sử đô vật 'Sharpshooter'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Sharpshooter · Excellence of Execution · Pink & Black"
  },
  {
    id: "WWE-48",
    name: "Finn Bálor (The Demon King)",
    title: "Vương Giả Ác Ma - Nhà Vô Địch Universal Đầu Tiên",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Judgment Day · Demon King",
    image: "/assets/finn-ballor-demon.webp",
    meaning: "Võ sĩ phi thường người Ireland từng làm nên lịch sử khi đăng quang chức vô địch Universal Champion đầu tiên của WWE. Khi đối mặt thử thách tột cùng, anh giải phóng bản thể quỷ dữ cổ xưa 'The Demon King' với những nét vẽ thần thoại ma quái, đòn đá góc đài Shotgun Dropkick sấm sét và cú nhảy dậm hai chân từ đỉnh cột đài xé toạc đối thủ 'Coup de Grâce'.",
    rarity: "Truyền Thuyết Dị Giáo",
    element: "Coup de Grâce · 1916 · The Demon Unleashed"
  },
  {
    id: "WWE-49",
    name: "Gran Metalik (The King of the Ropes)",
    title: "Vua Dây Đài Lucha Libre - Siêu Đô Vật Khinh Công",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Lucha House Party · Lucha Libre World",
    image: "/assets/gran-metalik.webp",
    meaning: "Bậc thầy Lucha Libre người Mexico được ca ngợi là 'King of the Ropes' nhờ khả năng bước đi và giữ thăng bằng thoăn thoắt trên dây đài như không trọng lực. Tỏa sáng trong giải đấu Cruiserweight Classic, mê hoặc khán giả bằng những pha bay lượn ngút ngàn, cú đáp Moonsault từ dây trên cùng và tuyệt chiêu ném người 'Metalik Driver' hoa mỹ rực rỡ.",
    rarity: "Hoàng Kim Lucha Libre",
    element: "Metalik Driver · Rope Walk Moonsault · Lucha House Party"
  },
  {
    id: "WWE-50",
    name: "JBL (John Bradshaw Layfield)",
    title: "Nhà Tài Phiệt Texas - Cựu Vô Địch WWE Kỷ Lục SmackDown",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Cabinet · APA",
    image: "/assets/jbl.webp",
    meaning: "Tỉ phú tự phong ngạo nghễ đến từ New York City qua gốc gác Texas, xuất hiện trong chiếc limousine trắng gắn sừng bò dài và mũ cao bồi sang trọng. Từng thống trị SmackDown với tư cách nhà vô địch WWE Championship dài nhất lịch sử thời bấy giờ, kết liễu mọi kẻ thách thức bằng cú vung tay tàn bạo xé toạc không khí trứ danh 'Clothesline from Hell'.",
    rarity: "Hoàng Kim Đô Vật",
    element: "Clothesline from Hell · Texas Piledriver · Longhorn Limousine"
  },
  {
    id: "WWE-51",
    name: "Jey Uso (Main Event Jey Uso)",
    title: "Chiến Binh Độc Lập - Cơn Sốt Toàn Cầu 'YEET!'",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Usos · The Bloodline Renegade",
    image: "/assets/jey-uso.webp",
    meaning: "Ngôi sao kiệt xuất của gia tộc Samoa danh giá Anoa'i, người bứt phá khỏi cái bóng của The Bloodline để trở thành hiện tượng văn hóa 'Main Event Jey Uso' khiến cả cầu trường hàng vạn người cùng vẫy tay hô vang 'YEET!'. Nắm giữ kỷ lục vô địch Tag Team lâu nhất lịch sử, kết liễu đối thủ bằng những cú đá Superkick chớp nhoáng, đòn húc Spear dũng mãnh và cú nhảy áp sàn sấm sét 'Uso Splash'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Uso Splash · Superkick · YEET Movement"
  },
  {
    id: "WWE-52",
    name: "Kalisto (Lucha Legend)",
    title: "Chiến Binh Lucha Libre - Cựu Vô Địch United States",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Lucha Dragons · Lucha House Party",
    image: "/assets/kalisto.webp",
    meaning: "Võ sĩ mặt nạ Lucha Libre quả cảm với khẩu hiệu quen thuộc 'Lucha! Lucha! Lucha!', từng 2 lần đoạt đai United States Championship và đai Cruiserweight. Tác giả của khoảnh khắc đoạt giải Slammy Award với cú lộn người Salida del Sol từ đỉnh thang cao chót vót, sở hữu những pha nhào lộn xoay người lóa mắt và tuyệt kỹ hạ màn thần sầu 'Salida del Sol'.",
    rarity: "Hoàng Kim Lucha Libre",
    element: "Salida del Sol · 450 Splash · Lucha! Lucha!"
  },
  {
    id: "WWE-53",
    name: "LA Knight (The Megastar)",
    title: "Siêu Sao Quốc Dân - United States Champion (YEAH!)",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Megastar · YEAH! Movement",
    image: "/assets/la-knight.webp",
    meaning: "Siêu sao đô vật mang phong thái tự tin ngút ngàn và kỹ năng cầm mic bậc thầy, thổi bùng hiện tượng toàn cầu với khẩu hiệu vang dội khắp các khán đài 'LEMME TALK TO YA!' và tiếng đồng thanh 'YEAH!'. Nhà vô địch United States Championship kiêu dũng, áp đảo đối thủ bằng đòn giật cùi chỏ Blunt Force Trauma (BFT) trứ danh hạ đo ván mọi kẻ ngáng đường.",
    rarity: "Chí Tôn Đô Vật",
    element: "Blunt Force Trauma (BFT) · YEAH! · Lemme Talk To Ya"
  },
  {
    id: "WWE-54",
    name: "Logan Paul (The Maverick)",
    title: "Kỳ Tài Truyền Thông Xuyên Giới - United States Champion",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Maverick · PRIME Energy",
    image: "/assets/logan-paul.webp",
    meaning: "Hiện tượng thể thao giải trí đa tài bậc nhất thế hệ mới, biến đổi từ ngôi sao truyền thông toàn cầu trở thành đô vật xuất sắc với thể chất và sự dũng cảm phi thường. Từng giữ đai United States Champion danh giá, nổi danh với những pha bay người đáp bàn bình luận từ nóc đài, cú đấm tay phải ngàn cân 'One Lucky Punch' và tuyệt kỹ đáp người trên không 'Paulmist Splash'.",
    rarity: "Hoàng Kim Đô Vật",
    element: "One Lucky Punch · Buckshot Lariat · The Maverick Flight"
  },
  {
    id: "WWE-55",
    name: "Ric Flair (The Nature Boy)",
    title: "16 Lần Vô Địch Thế Giới - Biểu Tượng Bất Hủ Của Đô Vật",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Four Horsemen · Evolution",
    image: "/assets/ric-flair.webp",
    meaning: "Huyền thoại sống vĩ đại bậc nhất lịch sử thể thao đối kháng thế giới với kỷ lục 16 lần đăng quang vô địch thế giới và 2 lần bước vào WWE Hall of Fame. Với chiếc áo choàng nhung kim tuyến lộng lẫy và tiếng thét thị uy bất hủ 'WOOOO!', ông trừng phạt đối thủ bằng những cú chém ngực rát bỏng Knife Edge Chop, đòn bẩn tinh quái và thế khóa chân rút cạn sinh lực 'Figure-Four Leglock'.",
    rarity: "Chí Tôn Bá Vương",
    element: "Figure-Four Leglock · Knife Edge Chop · WOOOO!"
  },
  {
    id: "WWE-56",
    name: "The Sandman (Hardcore Icon)",
    title: "Huyền Thoại Đấu Vật Cực Đoan - Biểu Tượng ECW Bất Khuất",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "ECW Originals · Hardcore Revolution",
    image: "/assets/sandman.webp",
    meaning: "Biểu tượng bất tử của giải đấu đối kháng cực đoan ECW, nổi tiếng với màn xuất hiện qua hàng ngàn khán giả ngập tràn khói thuốc, đập vỏ lon bia vào trán tóe máu trên nền nhạc Metallica. Người hùng bụi bặm không bao giờ lùi bước, luôn cầm trên tay cây gậy mây Singapore Cane nện túi bụi vào mọi đối thủ và tung cú nhảy tiếp đất White Russian Legsweep tàn bạo.",
    rarity: "Truyền Thuyết Hardcore",
    element: "Singapore Cane · White Russian Legsweep · Enter Sandman"
  },
  {
    id: "WWE-57",
    name: "Solo Sikoa (The Tribal Chief)",
    title: "Hộ Vệ Tàn Bạo - Thủ Lĩnh Mới Của The Bloodline",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The New Bloodline · Samoan Dynasty",
    image: "/assets/solo-sikoa.webp",
    meaning: "Hậu duệ dũng mãnh và lạnh lùng nhất của dòng máu chiến binh Samoa Anoa'i, người từng là Enforcer tàn bạo trước khi tự mình tiếp quản chiếc vòng hoa quyền lực Ula Fala trở thành tân Tribal Chief. Không ngần ngại trừng phạt bất kỳ ai với đôi mắt vô cảm, những cú húc góc đài nghiền nát và cú đâm ngón tay bọc băng quấn chết chóc 'Samoan Spike' đâm thẳng vào yết hầu đối phương.",
    rarity: "Chí Tôn Bá Vương",
    element: "Samoan Spike · Spinning Solo · Samoan Drop"
  },
  {
    id: "WWE-58",
    name: "The Rock (The Great One)",
    title: "The People's Champion - The Final Boss (10 Lần Vô Địch Thế Giới)",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The People's Champion · The Bloodline High Council",
    image: "/assets/the-rock.webp",
    meaning: "Nhân vật giải trí có sức ảnh hưởng điện ảnh và văn hóa khổng lồ nhất lịch sử thế giới, 'The Most Electrifying Man in Sports Entertainment' với 10 lần vô địch thế giới. Nổi danh với câu nói bất hủ 'If ya smell what The Rock is cookin'!', cái nhướn mày People's Eyebrow trứ danh, tuyệt kỹ nhấc bổng quật ngã 'Rock Bottom' và đòn chỏ tay điện giật triệu người reo hò 'The People's Elbow'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Rock Bottom · The People's Elbow · If You Smell"
  },
  {
    id: "WWE-59",
    name: "The Ultimate Warrior",
    title: "Chiến Binh Tối Thượng - Cơn Lốc Năng Lượng Thần Thoại",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Parts Unknown · Warrior Nation",
    image: "/assets/ultimate-warrior.webp",
    meaning: "Huyền thoại bất hủ của kỷ nguyên vàng WWE, hiện thân của nguồn năng lượng hoang dã vô tận với khuôn mặt vẽ mặt nạ sắc màu rực rỡ và những sợi dây ruy băng bay phấp phới. Nổi tiếng với màn phi nước đại vào võ đài giật rung chuyển dây đài thị uy, cú húc vai Gorilla Press Slam nhấc bổng đối thủ qua đầu rồi ném rơi tự do trước khi tung cú nhảy dậm bụng 'Warrior Splash' hủy diệt.",
    rarity: "Chí Tôn Đô Vật",
    element: "Gorilla Press Slam · Warrior Splash · Always Believe"
  },
  {
    id: "WWE-60",
    name: "The Undertaker (The Deadman)",
    title: "Kẻ Đào Huyệt Bất Tử - Kỷ Lục 21 Trận Bất Bại WrestleMania (The Streak)",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Ministry of Darkness · The Deadman",
    image: "/assets/underaker.webp",
    meaning: "Tượng đài vĩ đại và đáng kính trọng bậc nhất lịch sử võ đài WWE suốt ba thập kỷ, 'The Phenom' bước ra từ khói sương bóng tối cùng tiếng chuông nhà thờ tang tóc ngân vang. Nắm giữ chuỗi bất bại thần thoại 21 trận liên tiếp tại WrestleMania (The Streak), nổi danh với màn bật dậy từ cõi chết, cú bóp cổ Chokeslam nghẹt thở, đòn quăng xe Last Ride và tuyệt kỹ kết liễu tối thượng đóng đinh đối thủ 'Tombstone Piledriver' (Rest In Peace).",
    rarity: "Chí Tôn Thần Ma",
    element: "Tombstone Piledriver · Chokeslam · The Last Ride · Rest In Peace"
  },
  {
    id: "WWE-61",
    name: "Xavier Woods (King Woods)",
    title: "Bộ Não Sáng Tạo The New Day - King of the Ring",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The New Day · UpUpDownDown",
    image: "/assets/xavier-woods.webp",
    meaning: "Bộ óc chiến lược và nguồn cảm hứng sáng tạo vô tận của nhóm The New Day, cựu vương miện King of the Ring và nhà sáng lập đế chế game UpUpDownDown. Thổi bùng không khí võ đài bằng cây kèn trombone 'Francesca' trứ danh, phong cách chiến đấu tốc độ thông minh với cú thả cùi chỏ bay từ dây đài trên cùng 'Limit Break Ropewalk Elbow Drop' tuyệt đẹp.",
    rarity: "Hoàng Kim Đô Vật",
    element: "Limit Break Elbow Drop · Francesca Trombone · UpUpDownDown"
  }
];

// 1. Read existing wwe.json
const wwePath = 'src/data/chibi/wwe.json';
const existingWwe = JSON.parse(fs.readFileSync(wwePath, 'utf-8'));
const existingNames = new Set(existingWwe.map(c => c.name));
const toAdd = newCharacters.filter(c => !existingNames.has(c.name));
const updatedWwe = [...existingWwe, ...toAdd];
fs.writeFileSync(wwePath, JSON.stringify(updatedWwe, null, 2), 'utf-8');
console.log(`Updated ${wwePath}: ${existingWwe.length} -> ${updatedWwe.length} characters.`);

// 2. Rebuild all_chibi.json
const cats = ['than_gioi', 'tay_du', 'ma_gioi', 'viet_nam', 'tam_quoc', 'kim_dung', 'phong_van', 'wwe'];
let allCharacters = [];

for (const cat of cats) {
  const filePath = `src/data/chibi/${cat}.json`;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  allCharacters = allCharacters.concat(data);
  console.log(`- ${cat}: ${data.length} cards`);
}

fs.writeFileSync('src/data/chibi/all_chibi.json', JSON.stringify(allCharacters, null, 2), 'utf-8');
console.log(`\nSuccessfully written src/data/chibi/all_chibi.json with total: ${allCharacters.length} cards.`);

// 3. Verify public/assets coverage
const allAssets = fs.readdirSync('public/assets');
const usedInDb = new Set(allCharacters.map(c => path.basename(c.image)));
const unmapped = allAssets.filter(f => !usedInDb.has(f) && f.endsWith('.webp') && f !== 'media_1787939166360.webp');

console.log(`\nVerification against public/assets (Total assets: ${allAssets.length}):`);
console.log(`- Mapped in database: ${usedInDb.size}`);
console.log(`- Remaining unmapped wrestler files:`, unmapped);
