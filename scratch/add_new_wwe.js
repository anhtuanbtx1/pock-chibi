const fs = require('fs');
const path = require('path');

const newWweCharacters = [
  {
    id: "WWE-16",
    name: "Wade Barrett (The Barrage)",
    title: "Thủ Lĩnh The Nexus - Kẻ Gieo Rắc Tin Dữ (Bad News)",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Nexus · King of the Ring",
    image: "/assets/barrett.webp",
    meaning: "Võ sĩ người Anh dũng mãnh xuất thân từ quyền anh tay trần ngầm, thủ lĩnh khai sáng liên minh The Nexus từng làm rung chuyển toàn bộ WWE. Nổi tiếng với phong thái ngạo nghễ 'Bad News Barrett' mang đến tin dữ cho đối thủ, sở hữu tuyệt kỹ quăng ngã Wasteland uy lực và cú đấm cùi chỏ hủy diệt chớp nhoáng 'Bullhammer' hạ đo ván bất kỳ kẻ ngáng đường nào.",
    rarity: "Hoàng Kim Đô Vật",
    element: "Bullhammer · Wasteland · Bad News"
  },
  {
    id: "WWE-17",
    name: "Bobby Lashley (The All Mighty)",
    title: "Chiến Binh Toàn Năng - 2 Lần Vô Địch WWE Thế Giới",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The All Mighty · The Hurt Business",
    image: "/assets/bobby-lashley.webp",
    meaning: "Cỗ máy chiến đấu hoàn hảo sở hữu thể hình đồ sộ cuồn cuộn cơ bắp kết hợp kỹ năng MMA đỉnh cao với tôn chỉ 'Strength, Discipline, Dominance'. Trụ cột quyền lực của The Hurt Business, từng 2 lần đoạt đai WWE Championship thế giới. Áp đảo sàn đấu bằng cú Spear sấm sét, đòn nhấc ném Dominator tàn khốc và thế khóa bẻ gãy ý chí toàn diện 'The Hurt Lock' bất khả đào thoát.",
    rarity: "Chí Tôn Bá Vương",
    element: "The Hurt Lock · Dominator · Spear"
  },
  {
    id: "WWE-18",
    name: "The Boogeyman (The Worm Eater)",
    title: "Cơn Ác Mộng Đêm Đen - Quái Khách Nuốt Giun",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Bottomless Pit · Supernatural Horror",
    image: "/assets/boogeyman.webp",
    meaning: "Nhân vật quái dị và đáng sợ bậc nhất lịch sử WWE, xuất hiện từ đáy sâu bóng tối cùng chiếc đồng hồ gõ vào đầu và câu răn đe rợn gáy 'I\\'m the Boogeyman and I\\'m comin\\' to getcha!'. Reo rắc nỗi kinh hoàng cho đối thủ bằng màn nhai nuốt giun đất sống ghê rợn, cây gậy đầu lâu ma quái cùng đòn nện sàn sấm sét 'Boogey Slam' kết liễu tâm lý kẻ đối đầu.",
    rarity: "Truyền Thuyết Dị Giáo",
    element: "Boogey Slam · Good Luck Worms · He Comes At Night"
  },
  {
    id: "WWE-19",
    name: "Dylan Postl (Hornswoggle)",
    title: "The Irish Warrior - Vị Vua Tí Hon Sàn Đấu",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Finlay's Clan · Little Bastard",
    image: "/assets/dylan-postl.webp",
    meaning: "Võ sĩ tí hon quả cảm người Ireland từng đăng quang đai WWE Cruiserweight Champion huyền thoại, biểu tượng của tinh thần 'Small But Fierce' (Nhỏ nhưng kiên cường). Thường bất ngờ chui ra từ gầm sàn đấu tạo nên những khoảnh khắc hài hước kinh điển, sẵn sàng vung cây gậy Shillelagh trợ chiến và tung cú nhảy tiếp đất 'Tadpole Splash' đầy bất ngờ.",
    rarity: "Hoàng Kim Tí Hon",
    element: "Tadpole Splash · Celtic Shillelagh · Small But Fierce"
  },
  {
    id: "WWE-20",
    name: "Goldust (The Bizarre One)",
    title: "Ngôi Sao Kỳ Quái - Dustin Rhodes",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Rhodes Dynasty · Golden Era",
    image: "/assets/goldust.webp",
    meaning: "Kỳ tài độc nhất vô nhị của gia tộc Rhodes lừng lẫy, hóa thân vào nhân vật điện ảnh dát vàng ma mị 'The Bizarre One' khuynh đảo tâm lý mọi đối thủ. Sở hữu kỹ thuật đấu vật cổ điển thượng thặng kế thừa từ người cha huyền thoại Dusty Rhodes, đòn đá góc đài tàn nhẫn 'Shattered Dreams' cùng tuyệt chiêu hạ màn kinh điển 'Curtain Call'.",
    rarity: "Hoàng Kim Đô Vật",
    element: "Curtain Call · Shattered Dreams · Golden Touch"
  },
  {
    id: "WWE-21",
    name: "Hulk Hogan (The Immortal)",
    title: "Tượng Đài Bất Tử Của Đô Vật - 12 Lần Vô Địch Thế Giới",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Hulkamania · nWo Hollywood",
    image: "/assets/hulk-hogan.webp",
    meaning: "Tượng đài bất tử đưa thể thao giải trí WWE trở thành hiện tượng văn hóa toàn cầu, người tạo nên cơn bão 'Hulkamania' vĩ đại suốt nhiều thập kỷ. Với 12 lần đăng quang vô địch thế giới, ông nổi tiếng với màn xé áo thị uy, động tác hứng tai nghe tiếng reo hò triệu người, khả năng 'Hulk Up' phản đòn phi thường khi bị dồn vào chân tường và cú dậm chân sấm sét 'Atomic Leg Drop'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Atomic Leg Drop · Hulk Up · Hulkamania"
  },
  {
    id: "WWE-22",
    name: "The Hurricane (Gregory Helms)",
    title: "Hiệp Sĩ Áo Choàng Xanh - Siêu Anh Hùng Võ Đài",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Superhero Universe · Cruiserweight Elite",
    image: "/assets/hurricane.webp",
    meaning: "Siêu anh hùng đeo mặt nạ được hâm mộ cuồng nhiệt bậc nhất sàn đấu với khẩu hiệu vang dội 'Stand Back, There\\'s a Hurricane Coming Through!'. Từng nắm giữ đai Cruiserweight dài nhất lịch sử và đánh bại cả The Rock trong một đêm huyền thoại. Nổi danh với chiếc áo choàng xanh lộng gió, tuyệt chiêu xoay người 'Eye of the Hurricane' và cú Hurri-Chokeslam dũng cảm trước những đối thủ khổng lồ.",
    rarity: "Truyền Thuyết Lucha Libre",
    element: "Eye of the Hurricane · Hurri-Chokeslam · Stand Back"
  },
  {
    id: "WWE-23",
    name: "Chris Jericho (Y2J)",
    title: "Nhà Vô Địch Undisputed Đầu Tiên - The Ocho",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Y2J · The Jericho Appreciation Society",
    image: "/assets/jericho.webp",
    meaning: "Bậc thầy thể thao giải trí tự xưng là 'The Best in the World at What I Do', người làm nên lịch sử khi đánh bại cả The Rock và Stone Cold trong cùng một đêm để trở thành Undisputed WWE Champion đầu tiên. Kỷ lục 9 lần vô địch Intercontinental, sở hữu đòn khóa lưng tàn khốc 'Walls of Jericho', cú nhảy đầu gối đập mặt sấm sét 'Codebreaker' và danh sách trừng phạt 'The List of Jericho' lừng danh.",
    rarity: "Chí Tôn Đô Vật",
    element: "Codebreaker · Walls of Jericho · The Judas Effect"
  },
  {
    id: "WWE-24",
    name: "Kevin Nash (Big Sexy / Diesel)",
    title: "Thành Viên Sáng Lập nWo - Gã Khổng Lồ 2m10",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "nWo (New World Order) · The Kliq",
    image: "/assets/kevin-nash.webp",
    meaning: "Gã khổng lồ cao 2m10 quyền lực từng thống trị cả WWE dưới biệt danh Diesel và châm ngòi cho cuộc chiến thế kỷ Monday Night Wars khi đồng sáng lập New World Order (nWo). Hai lần vinh danh tại sảnh Hall of Fame, sở hữu cú đạp chân Big Boot như trời giáng cùng tuyệt kỹ 'Jackknife Powerbomb' nhấc bổng đối thủ lên tận trời xanh rồi ném dội sàn hủy diệt.",
    rarity: "Chí Tôn Bá Vương",
    element: "Jackknife Powerbomb · nWo 4-Life · Big Boot"
  },
  {
    id: "WWE-25",
    name: "Kofi Kingston (The New Day)",
    title: "Huyền Thoại KofiMania - WWE World Champion",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The New Day · Power of Positivity",
    image: "/assets/kofi-kingston.webp",
    meaning: "Võ sĩ gốc Ghana tràn đầy năng lượng tích cực 'Power of Positivity', thủ lĩnh nhóm The New Day nắm giữ kỷ lục vô địch Tag Team lâu nhất lịch sử và viết nên câu chuyện cổ tích xúc động 'KofiMania' tại WrestleMania 35 để đoạt đai WWE Championship. Nổi danh với những pha thoát hiểm nhào lộn ngoạn mục tại Royal Rumble cùng cú đá xoay 360 độ sấm sét 'Trouble in Paradise'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Trouble in Paradise · SOS · Boom Drop"
  },
  {
    id: "WWE-26",
    name: "R-Truth (Ron Killings)",
    title: "54 Lần Đoạt Đai 24/7 - Vua Giải Trí Quốc Dân",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Awesome Truth · What's Up Movement",
    image: "/assets/r-truth.webp",
    meaning: "Ngôi sao hài hước được yêu thích bậc nhất WWE với khẩu hiệu đồng thanh bùng nổ cầu trường 'What\\'s Up?!', người nắm giữ kỷ lục vô tiền khoáng hậu với 54 lần đoạt đai 24/7 Championship. Phong cách chiến đấu linh hoạt dẻo dai kết hợp nhảy breakdance, cú đá xoay Lie Detector bất ngờ và luôn mang lại tiếng cười sảng khoái với những hiểu lầm ngây ngô đầy duyên dáng.",
    rarity: "Hoàng Kim Đô Vật",
    element: "What's Up? · Lie Detector · Little Jimmy"
  },
  {
    id: "WWE-27",
    name: "Rikishi (The Samoan King)",
    title: "Huyền Thoại Gia Tộc Anoa'i - WWE Hall of Famer",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Too Cool · Samoan Dynasty",
    image: "/assets/rikishi.webp",
    meaning: "Võ sĩ hộ pháp nặng gần 200kg thuộc huyết thống gia tộc Samoa Anoa'i danh giá, cha đẻ của The Usos và Solo Sikoa. Nổi danh toàn cầu trong nhóm Too Cool với những màn nhảy múa ăn mừng điêu luyện bất ngờ, cú đè người Banzai Drop nghiền nát đối thủ cùng đòn sỉ nhục hài hước trứ danh 'The Stinkface' ép mông vào mặt đối phương ở góc đài khiến mọi kẻ thù khiếp vía.",
    rarity: "Truyền Thuyết Đô Vật",
    element: "The Stinkface · Banzai Drop · Samoan Splash"
  },
  {
    id: "WWE-28",
    name: "Ryback (The Big Guy)",
    title: "Quái Kiệt 'Feed Me More' - Intercontinental Champion",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Big Guy · RybAxel",
    image: "/assets/ryback.webp",
    meaning: "Cỗ máy cơ bắp cuồn cuộn với lối đánh càn quét vũ bão, nổi tiếng cùng tiếng hô hào vang dội cả khán đài 'Feed Me More!'. Từng nắm giữ đai Intercontinental Championship, áp đảo đối phương bằng những cú húc người Meat Hook Clothesline uy lực xé gió trước khi vác cùng lúc hai đối thủ trên vai rồi nện xuống sàn bằng tuyệt chiêu 'Shell Shocked'.",
    rarity: "Truyền Thuyết Đô Vật",
    element: "Shell Shocked · Meat Hook Clothesline · Feed Me More"
  },
  {
    id: "WWE-29",
    name: "Seth Rollins (The Visionary)",
    title: "The Architect - World Heavyweight Champion",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Shield · The Visionary",
    image: "/assets/seth-rollins.webp",
    meaning: "Kiến trúc sư thiên tài 'The Architect' đứng sau đế chế The Shield và là ngôi sao có tầm nhìn đột phá 'The Visionary' với câu khẩu hiệu rực lửa 'Burn It Down!'. Tác giả của màn 'Cướp Đai Của Thế Kỷ' (Heist of the Century) tại WrestleMania 31, nắm giữ mọi danh hiệu danh giá của WWE cùng tuyệt chiêu dậm chân cắm đầu đối thủ xuống sàn đấu tàn bạo 'The Stomp'.",
    rarity: "Chí Tôn Đô Vật",
    element: "The Stomp (Curb Stomp) · Pedigree · Burn It Down"
  },
  {
    id: "WWE-30",
    name: "Shelton Benjamin (The Gold Standard)",
    title: "Vận Động Viên Thể Chất Thuần Túy Nhất Lịch Sử WWE",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Hurt Business · The World's Greatest Tag Team",
    image: "/assets/shelton-benjamin.webp",
    meaning: "Đô vật sở hữu nền tảng thể chất và kỹ thuật điền kinh phi thường bậc nhất lịch sử, được mệnh danh là 'The Gold Standard'. Huyền thoại bất hủ của những trận đấu thang Money in the Bank với những pha chạy trên dây đài và bay người không tưởng, thành viên chủ chốt của The Hurt Business sở hữu đòn vật lật ngửa sấm sét 'T-Bone Suplex' và tuyệt chiêu bẻ cằm 'Paydirt'.",
    rarity: "Hoàng Kim Đô Vật",
    element: "T-Bone Suplex · Paydirt · Superkick"
  },
  {
    id: "WWE-31",
    name: "Sting (The Icon)",
    title: "The Stinger - Biểu Tượng Bất Tử Của WCW & Sảnh Danh Vọng",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "The Crow · WCW Franchise",
    image: "/assets/sting.webp",
    meaning: "Biểu tượng huyền thoại vĩ đại được tôn xưng là 'The Icon' và linh hồn bất diệt của WCW suốt nhiều thập kỷ đối đầu nWo. Với khuôn mặt hóa trang đen trắng bí ẩn lấy cảm hứng từ The Crow, cây gậy bóng chày đen uy hiếp bóng tối từ trần đấu, cùng bộ đôi tuyệt chiêu kết liễu trứ danh 'Scorpion Death Drop' và thế khóa bẻ chân kinh điển 'Scorpion Deathlock'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Scorpion Deathlock · Scorpion Death Drop · Black Bat"
  },
  {
    id: "WWE-32",
    name: "Último Dragón (Dragon of the Ring)",
    title: "Huyền Thoại J-Crown - Võ Sĩ Nắm Giữ Cùng Lúc 10 Chiếc Đai",
    category: "wwe",
    categoryLabel: "Huyền Thoại WWE",
    faction: "Toryumon · Cruiserweight Dragon",
    image: "/assets/ultimo-dragon.webp",
    meaning: "Kỳ nhân võ thuật và Lucha Libre người Nhật Bản, người duy nhất trong lịch sử từng đồng thời nắm giữ kỷ lục vô tiền khoáng hậu 10 chiếc đai vô địch thế giới (J-Crown Octuple Champion). Nhà sáng lập tuyệt kỹ nhào lộn trứ danh thế giới 'Asai Moonsault' từ mép đài ra ngoài, cùng thế khóa cổ rồng 'Dragon Sleeper' khuất phục vô số anh hào quốc tế.",
    rarity: "Truyền Thuyết Lucha Libre",
    element: "Asai Moonsault · Dragon Sleeper · Dragon Suplex"
  }
];

// 1. Read existing wwe.json
const wwePath = 'src/data/chibi/wwe.json';
const existingWwe = JSON.parse(fs.readFileSync(wwePath, 'utf-8'));

// Filter out any duplicates if run multiple times
const existingIds = new Set(existingWwe.map(c => c.id));
const toAdd = newWweCharacters.filter(c => !existingIds.has(c.id));

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

// 3. Verify public/assets against all_chibi.json
const allAssets = fs.readdirSync('public/assets');
const usedInDb = new Set(allCharacters.map(c => path.basename(c.image)));
const unmapped = allAssets.filter(f => !usedInDb.has(f));

console.log(`\nVerification against public/assets (Total files: ${allAssets.length}):`);
console.log(`- Mapped in database: ${usedInDb.size}`);
console.log(`- Unmapped files (${unmapped.length}):`, unmapped);
