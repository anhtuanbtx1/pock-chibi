const fs = require('fs');
const path = require('path');

const dotaCharacters = [
  {
    name: "Abaddon (Lord of Avernus)",
    title: "Lãnh Chúa Avernus - Kỵ Sĩ Sương Mù Bất Tử",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Quân Đoàn Tử Vong · Lãnh Địa Bất Tử",
    image: "/assets/dota/abaddon.webp",
    meaning: "Truyền nhân của dòng họ Avernus cao quý, người tắm mình trong dòng suối sương đen thần bí để đạt tới cảnh giới bất tử. Bao bọc đồng minh bằng Khiên Băng Sương Hấp Thụ (Aphotic Shield), bắn Mũi Cương Thi Ma Quỷ và kích hoạt Mượn Tạm Thời Gian (Borrowed Time) biến mọi sát thương phải gánh chịu thành sinh lực dồi dào.",
    rarity: "Huyền Thoại Kỵ Sĩ",
    element: "Khí Sương Avernus · Khiên Hấp Thụ Ma Thuật"
  },
  {
    name: "Anti-Mage (Magina)",
    title: "Thợ Săn Ma Pháp - Khắc Tinh Của Mọi Pháp Sư",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/anti-mage.webp",
    meaning: "Tăng lữ sống sót sau thảm họa diệt vong tại tu viện Turstarkuri dưới tay Quân Đoàn Chết Chóc. Thề tiêu diệt tận gốc mọi ma thuật trên cõi đời bằng song đoản đao triệt tiêu pháp lực (Mana Break), dịch chuyển hư không (Blink) thoắt ẩn thoắt hiện và tung Hư Không Ma Đạn (Mana Void) làm nổ tung kẻ thù cạn kiệt năng lượng.",
    rarity: "Chí Tôn Thợ Săn",
    element: "Đoản Đao Triệt Pháp · Hư Không Ma Đạn"
  },
  {
    name: "Arthas Menethil (The Lich King)",
    title: "Hiệp Sĩ Sa Ngã - Chúa Tể Đỉnh Băng Giá The Lich King",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/arthas-menethil.webp",
    meaning: "Vị hoàng tử kiêu hãnh của vương quốc Lordaeron, người đã rút thanh ma kiếm Frostmourne để cứu vương quốc nhưng bị tha hóa trở thành The Lich King tối cao - linh hồn khởi nguyên của Death Knight Abaddon trong DotA. Ngồi trên Ngai Băng Giá Icecrown, thống lĩnh Quân Đoàn Xác Sống Scourge gieo rắc mùa đông lạnh giá vĩnh cửu lên toàn bộ sinh linh.",
    rarity: "Chí Tôn Hoàng Đế",
    element: "Ma Kiếm Frostmourne · Ngai Vàng Băng Giá"
  },
  {
    name: "Bane (Atropos)",
    title: "Ác Mộng Vĩnh Hằng - Nỗi Sợ Hãi Thần Thánh Nyctasha",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/bane.webp",
    meaning: "Thực thể quỷ dị sinh ra từ cơn ác mộng kinh hoàng của nữ thần đêm tối Nyctasha. Hắn ăn sâu vào tâm trí con người, ru ngủ kẻ thù vào Giấc Mộng Đêm (Nightmare), hút cạn sinh lực (Brain Sap) và trói buộc mục tiêu bằng Khúc Trói Ác Mộng (Fiend's Grip) cô lập hoàn toàn khỏi chiến trường.",
    rarity: "Truyền Thuyết Ác Mộng",
    element: "Ảo Mộng Đen Tối · Trói Hồn Fiend's Grip"
  },
  {
    name: "Blackhand (The Destroyer)",
    title: "Hắc Thủ Đại Tù Trưởng - Chiến Thần Rèn Lửa Bộ Tộc Blackrock",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/blackhand.webp",
    meaning: "Đại tù trưởng thiết tộc tàn bạo của bộ tộc Blackrock trong sử thi Warcraft cổ xưa, nguồn cảm hứng nguyên bản của các chiến tướng cơ bắp DotA. Tay cầm búa rèn đỏ rực magma, dẫn dắt quân đoàn Orc càn quét Azeroth với sức mạnh nghiền nát đá tảng và lòng quả cảm không biết run sợ.",
    rarity: "Chí Tôn Tù Trưởng",
    element: "Hỏa Ngục Thiết Búa · Magma Hắc Nham"
  },
  {
    name: "Bounty Hunter (Gondar)",
    title: "Thợ Săn Tiền Thưởng - Vết Dấu Thần Tốc Gondar",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/bounty-hunter.webp",
    meaning: "Sát thủ đánh thuê lão luyện lang thang khắp các lục địa, không con mồi nào thoát khỏi cặp mắt cú vọ của hắn. Đi rón rén vô hình giữa ban ngày (Shadow Walk), chém kiếm Jinada cướp vàng, phóng Thuriken ricochet và khắc ghi Dấu Ấn Truy Nã (Track) soi sáng tàng hình mang lại tiền tài kếch xù cho toàn đội.",
    rarity: "Huyền Thoại Thợ Săn",
    element: "Ẩn Thân Hành Tung · Dấu Ấn Truyền Tin Track"
  },
  {
    name: "Cenarius (Lord of the Forest)",
    title: "Bán Thần Rừng Thiêng - Đấng Hộ Mệnh Muôn Loài Tự Nhiên",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/cenarius.webp",
    meaning: "Á thần con trai của Nữ thần Mặt Trăng Elune và Bạch Hươu Malorne, sư phụ khai sáng thuật Druid cho Malfurion và là mô hình nguồn cội của các anh hùng tự nhiên trong DotA. Triệu hồi sức mạnh đất trời rễ cây trói buộc kẻ thù và thanh tẩy bóng tối ma quỷ bằng hào quang thiên nhiên.",
    rarity: "Chí Tôn Bán Thần",
    element: "Mộc Linh Rừng Già · Hào Quang Thanh Tẩy"
  },
  {
    name: "Centaur Warrunner (Bradwarden)",
    title: "Nhân Mã Chiến Thần - Cỗ Xe Tăng Vùng Đất Druud",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/centaur-warrunner.webp",
    meaning: "Võ sĩ giác đấu vĩ đại nhất vùng đất Druud, sở hữu thân hình nhân mã đồ sộ vững chãi như núi đá. Dậm móng rung chuyển mặt đất (Hoof Stomp), đòn chém Đôi Lưỡi Rìu (Double Edge) nứt toác đá tảng, giáp phản đòn gai nhọn và cất tiếng gầm Càn Quét Thần Tốc (Stampede) đưa cả đội băng qua mọi địa hình.",
    rarity: "Huyền Thoại Đấu Sĩ",
    element: "Bàn Chân Động Đất · Stampede Xung Kích"
  },
  {
    name: "Dawnbreaker (Valora)",
    title: "Ánh Minh Bình Minh - Chiếc Búa Rạng Đông Của Đấng Khởi Nguyên",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/dawnbreaker.webp",
    meaning: "Tạo vật chiến binh ánh sáng cổ xưa nhất của Những Đứa Con Của Mặt Trời (Children of the Light), được tôi luyện để xua tan màn đêm lạnh giá. Ném và triệu hồi Búa Thiên Hà rực lửa, xoay chớp nhoáng đập tan phòng tuyến và phóng vút lên trời giáng xuống Cột Sáng Cứu Thế (Solar Guardian) hồi máu đồng đội khắp tinh cầu.",
    rarity: "Thần Thoại Thượng Cổ",
    element: "Bình Minh Thánh Quang · Thiên Hà Hỏa Búa"
  },
  {
    name: "Disruptor",
    title: "Thống Soái Lôi Điện - Pháp Sư Bão Tố Cao Nguyên Oglodi",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Công Nghệ Cổ Tộc & Tinh Nghịch",
    image: "/assets/dota/disruptor.webp",
    meaning: "Thanh niên trẻ tuổi kiệt xuất của tộc Oglodi vùng cao nguyên Upland, làm chủ công nghệ điều khiển bão sấm cổ xưa. Bắt giữ kẻ thù bằng Lồng Động Lực (Kinetic Field), kéo giật lùi vị trí quá khứ (Glimpse) và giải phóng Cơn Bão Tĩnh Điện (Static Storm) phong ấn câm lặng mọi khả năng phản kháng của đối thủ.",
    rarity: "Huyền Thoại Bão Tố",
    element: "Lôi Điện Bão Cát · Tĩnh Điện Vực Sâu"
  },
  {
    name: "Doom (Lucifer)",
    title: "Ma Vương Diệt Thế - Chúa Tể Lửa Đỏ Địa Ngục",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/doom-bringer.webp",
    meaning: "Kẻ từng gục ngã từ ánh sáng thiên đường để trở thành chúa tể thống trị địa ngục thiêu rụi muôn loài. Nuốt chửng quái vật hấp thu ma thuật, thiêu đốt mặt đất bằng Đất Lửa (Scorched Earth) và giáng Lời Nguyền Tử Vong (Doom) phong ấn vĩnh viễn mọi chiêu thức và trang bị của kẻ địch cho đến hơi thở cuối cùng.",
    rarity: "Chí Tôn Ma Thần",
    element: "Địa Ngục Hỏa Diễm · Lời Nguyền Diệt Thế"
  },
  {
    name: "Dragon Knight (Davion)",
    title: "Long Huyết Kỵ Sĩ - Huyết Thống Hỏa Long Slyrak",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/dragon-knight.webp",
    meaning: "Kỵ sĩ dũng cảm đã hợp nhất linh hồn và dòng máu cùng Cổ Long Lửa Slyrak bên bờ vực cái chết. Lớp vảy rồng bất hoại hồi phục vết thương thần tốc, khiên rồng đập choáng kẻ địch và khả năng Hóa Thân Rồng Thần Cổ Xưa (Elder Dragon Form) phun băng, độc và lửa rực cháy thiêu rụi thành trì.",
    rarity: "Chí Tôn Kỵ Sĩ",
    element: "Long Huyết Chân Thân · Hỏa Long Thần Giáp"
  },
  {
    name: "Durotan",
    title: "Thủ Lĩnh Sói Tuyết - Linh Hồn Bất Khuất Tộc Frostwolf",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/durotan.webp",
    meaning: "Thủ lĩnh quả cảm của bộ tộc Frostwolf trong lịch sử Warcraft, cha đẻ của huyền thoại Thrall và biểu tượng tinh thần của các chiến binh Thú vương DotA. Luôn giữ vững danh dự của một chiến binh Orc thuần khiết, cùng chú sói tuyết trung thành chiến đấu chống lại ma thuật quỷ dữ đến hơi thở sau cùng.",
    rarity: "Chí Tôn Tù Trưởng",
    element: "Băng Lang Hùng Quyền · Rìu Thép Frostwolf"
  },
  {
    name: "Enigma",
    title: "Thực Thể Hư Vô Tối Thượng - Hố Đen Vũ Trụ Black Hole",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/enigma.webp",
    meaning: "Một trong bốn nguyên tố cơ bản của vũ trụ, hiện thân bí ẩn của lực hấp dẫn và chân không vô tận. Phân tách tinh vân triệu hồi Tiểu Tinh Linh (Eidolons), giáng tia chớp Malefice gây choáng liên hoàn và thi triển Hố Đen Hủy Diệt (Black Hole) nuốt chửng toàn bộ không-thời gian xoay chuyển cục diện trận đấu.",
    rarity: "Chí Tôn Thần Thoại",
    element: "Hấp Dẫn Hư Vô · Black Hole Vũ Trụ"
  },
  {
    name: "Gul'dan",
    title: "Kẻ Khởi Nguồn Tà Hỏa Fel - Đại Thuật Sĩ Hắc Ám",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/guldan.webp",
    meaning: "Thuật sĩ Orc tàn ác bậc nhất lịch sử Warcraft, kẻ bán linh hồn cho Quân Đoàn Rực Lửa để đổi lấy ma thuật Fel hủy diệt, là hình mẫu nguồn cội của các bóng ma nguyền rủa Warlock/Shadow Demon trong DotA. Điều khiển ngọn lửa xanh độc hại, triệu hồi quỷ dữ và thao túng vận mệnh bằng mưu mô quỷ quyệt.",
    rarity: "Chí Tôn Thuật Sĩ",
    element: "Tà Hỏa Hắc Ám Fel · Ma Trượng Hắc Hồn"
  },
  {
    name: "Illidan Stormrage",
    title: "Kẻ Phản Bội Bất Tử - Thợ Săn Ác Quỷ Song Đoản Kiếm Azzinoth",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/illidan-stormrage.webp",
    meaning: "Nhân vật huyền thoại bậc nhất Azeroth, mô hình cơ sở sáng tạo nên Anti-Mage và Terrorblade trong DotA Allstars. Đôi mắt mù bùng cháy ma nhãn lửa Fel, đôi cánh dơi ác quỷ vĩ đại và cặp song đao Chiến Kiếm Azzinoth chém đứt mọi kết giới ma pháp, thét vang câu nói bất hủ: 'Ngươi chưa chuẩn bị đâu!'.",
    rarity: "Chí Tôn Huyền Thoại",
    element: "Ma Hỏa Fel Vũ Trang · Chiến Kiếm Azzinoth"
  },
  {
    name: "Invoker (Kael'thas)",
    title: "Đại Pháp Sư Tối Thượng - Kẻ Nắm Giữ Vạn Ma Pháp Cổ Đại",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/invoker-kael.webp",
    meaning: "Pháp sư thông tuệ và kiêu hãnh bậc nhất vũ trụ, người duy nhất phá vỡ giới hạn trí nhớ phàm trần để điều khiển đồng thời mười thần chú ma pháp cổ đại. Kết hợp ba quả cầu nguyên tố Quas (Băng), Wex (Lôi), Exort (Hỏa) tạo nên Thiên Thạch Rơi (Chaos Meteor), Sóng Âm (Deafening Blast) và Tia Năng Lượng Mặt Trời (Sun Strike) hủy diệt mục tiêu toàn bản đồ.",
    rarity: "Chí Tôn Ma Thần",
    element: "Tam Giới Ma Cầu · Quas Wex Exort"
  },
  {
    name: "Jaina Proudmoore",
    title: "Nữ Pháp Sư Băng Tuyết Dalaran - Đại Đô Đốc Kirin Tor",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/jaina-proudmoore.webp",
    meaning: "Pháp sư tài ba kiệt xuất của thành phố phép thuật Dalaran, hình mẫu khởi nguyên của Crystal Maiden (Rylai) trong DotA cổ điển. Điều khiển dòng chảy băng tuyết tuyệt đối, triệu hồi thủy nguyên tố hộ mệnh và đóng băng quân đoàn kẻ thù bằng những cơn bão tuyết Blizzard trắng xóa cả một góc trời.",
    rarity: "Chí Tôn Pháp Sư",
    element: "Băng Tinh Tuyệt Đối · Bão Tuyết Dalaran"
  },
  {
    name: "Cửu Thiên Huyền Nữ (Khách Mời Tiên Giới)",
    title: "Cửu Thiên Huyền Nữ Thánh Tổ - Binh Pháp Chiến Thần Thượng Cổ",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/jiutian_xuannu_shengto.webp",
    meaning: "Vị thánh nữ thượng cổ đứng đầu binh pháp cửu trùng thiên đình, giáng lâm giữa cõi thần binh cổ đại Dota để khai sáng trận đồ bát quái và cân bằng linh lực càn khôn. Ngự trên mây lành ngũ sắc, nắm giữ thiên thư bí yếu trảm yêu trừ ma và phổ chiếu ánh sáng tiên phong vô tận.",
    rarity: "Chí Tôn Thần Thoại",
    element: "Cửu Trùng Tiên Khí · Binh Pháp Kỳ Môn"
  },
  {
    name: "Juggernaut (Yurnero)",
    title: "Kiếm Thánh Tuyệt Kỹ - Vong Hồn Đảo Mặt Nạ",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/juggernaut.webp",
    meaning: "Kẻ sống sót kiên cường cuối cùng của hòn đảo Mặt Nạ Cổ Xưa (Isle of Masks), nắm giữ kiếm thuật thượng thừa với chiếc mặt nạ truyền thống. Miễn nhiễm ma pháp với tuyệt chiêu Vòng Xoáy Lưỡi Kiếm (Blade Fury), hồi phục thần tốc bằng Cọc Trị Liệu và giải phóng chiêu thức tối thượng Vũ Điệu Kiếm Trảm (Omnislash) chém xuyên không gian trảm sát vạn địch.",
    rarity: "Chí Tôn Kiếm Thánh",
    element: "Vô Nhĩ Kiếm Trảm · Omnislash Bất Bại"
  },
  {
    name: "Kez (The Bird Samurai)",
    title: "Thủ Lĩnh Quạ Kazurai - Tuyệt Kỹ Song Phong Kiếm Sư",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/kez.webp",
    meaning: "Tân anh hùng dũng mãnh của thế giới Dota 2, thủ lĩnh kiên cường của phiến quân lông vũ Kazurai nổi dậy chống lại bạo chúa. Hoán đổi linh hoạt giữa đao kiếm võ sĩ Katana sắc bén và cặp đoản đao Sai nhanh như chớp, tung ra những chiêu thức trảm phong ảo diệu khiến kẻ thù không kịp trở tay.",
    rarity: "Huyền Thoại Kiếm Khách",
    element: "Quạ Đen Phong Trảm · Song Kiếm Kazurai"
  },
  {
    name: "Lina (The Slayer)",
    title: "Hỏa Nữ Hỗn Độn - Ngọn Lửa Cuồng Nhiệt Misrule",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/lina.webp",
    meaning: "Pháp sư hỏa thuật thiên bẩm với tính khí bộc trực rực lửa, người chị gái nghịch ngợm của nàng băng giá Rylai. Phóng cột lửa Dragon Slave quét sạch đội hình, làm bốc cháy mặt đất bằng Cột Lửa Hỏa Ngục (Light Strike Array) và kết liễu kẻ thù bằng Tia Sấm Sét Hỏa Ma (Laguna Blade) xé toạc không khí.",
    rarity: "Chí Tôn Pháp Sư",
    element: "Thiên Hỏa Hỗn Độn · Laguna Blade Hủy Diệt"
  },
  {
    name: "Malfurion Stormrage",
    title: "Đại Tông Sư Druid - Thần Bảo Hộ Cây Thế Giới Nordrassil",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/malfurion-stormrage.webp",
    meaning: "Vị Druid vĩ đại đầu tiên của chủng tộc Dạ Tiên Night Elf, người bảo vệ Cây Thế Giới và là mô hình nguồn cội của Furion (Nature's Prophet) trong DotA Allstars. Điều khiển rễ cây ngàn năm, triệu hồi người cây Treant và cưỡi ngọn gió thiên nhiên bay lượn bảo vệ sự cân bằng vĩnh hằng của muôn loài.",
    rarity: "Chí Tôn Đại Sư",
    element: "Thiên Mộc Sinh Khí · Lực Lượng Nordrassil"
  },
  {
    name: "Mirana (Princess of the Moon)",
    title: "Công Chúa Mặt Trăng - Nữ Thần Tế Đền Rừng Nightsilver",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/mirana.webp",
    meaning: "Công chúa từ bỏ ngai vàng quyền quý để dâng hiến cuộc đời phụng sự nữ thần mặt trăng Selemene. Cưỡi linh thú báo trắng Sagan oai dũng, phóng Mũi Tên Thần Ánh Trăng (Sacred Arrow) làm choáng đối thủ từ nửa bản đồ và phủ Màn Đêm Nguyệt Quang (Moonlight Shadow) che giấu toàn bộ đồng minh.",
    rarity: "Huyền Thoại Nữ Tế",
    element: "Bạch Nguyệt Thần Tiễn · Ánh Trăng Selemene"
  },
  {
    name: "Morphling",
    title: "Thủy Nguyên Tố Biến Hóa - Sao Băng Rơi Từ Băng Giá",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/morphling.webp",
    meaning: "Thực thể nguyên tố nước cổ xưa ngủ vùi trong sao băng rơi xuống giữa chiến trường đẫm máu. Làm chủ khả năng biến hóa cơ thể giữa sức mạnh cơ bắp và độ nhanh nhẹn linh hoạt (Attribute Shift), lướt sóng Waveform né tránh mọi sát thương và sao chép diện mạo năng lực đối phương đến hoàn hảo.",
    rarity: "Thần Thoại Nguyên Tố",
    element: "Thủy Lưu Biến Hóa · Sóng Triều Waveform"
  },
  {
    name: "Muradin Bronzebeard",
    title: "Vua Chiến Binh Tộc Lùn - Mountain King Búa Sấm Khởi Nguyên",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/muradin-bronzebeard.webp",
    meaning: "Dũng tướng lừng danh của vương quốc người lùn Khaz Modan, sư phụ dạy kiếm của hoàng tử Arthas và là mô hình khởi nguyên của Mountain King Zeus/Storm Spirit trong DotA. Tay búa tay rìu phóng búa sét làm choáng, dậm sấm chấn động mặt đất và hóa hình Đại Địa Cự Nhân (Avatar) mình đồng da sắt bất khả chiến bại.",
    rarity: "Chí Tôn Dũng Tướng",
    element: "Lôi Điện Chiến Búa · Cương Thể Avatar"
  },
  {
    name: "Night Stalker (Balanar)",
    title: "Dạ Quỷ Đêm Đen - Cơn Thịnh Nộ Của Đêm Vĩnh Cửu",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/night-stalker.webp",
    meaning: "Sinh vật bóng đêm cổ xưa còn sót lại từ thời kỳ sơ khai khi thế giới chưa từng có ánh mặt trời. Khi màn đêm buông xuống, hắn biến thành cơn ác mộng di động với tốc độ xé gió, tung Móng Vuốt Hắc Ám (Void), câm lặng kẻ địch và vỗ cánh bay lượn Dark Ascension săn lùng con mồi.",
    rarity: "Huyền Thoại Dạ Quỷ",
    element: "Hắc Dạ Săn Mồi · Móng Vuốt Bóng Đêm"
  },
  {
    name: "Nyx Assassin",
    title: "Sát Thủ Thần Nữ Nyx - Bọ Hung Đâm Thủng Hư Không",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/nyx-assassin.webp",
    meaning: "Sát thủ côn trùng được tôi luyện từ kén ấu trùng thiêng liêng phụng sự Nữ thần Nyx. Đâm gai nhọn dưới lòng đất (Impale), thiêu đốt linh lực đối thủ (Mana Burn), bật Giáp Gai Phản Phệ (Spiked Carapace) làm choáng kẻ tấn công và tàng hình Vendetta tung đòn chí mạng bất ngờ.",
    rarity: "Huyền Thoại Sát Thủ",
    element: "Thần Khúc Nyx · Giáp Gai Phản Phệ"
  },
  {
    name: "Ogre Magi (Aggron Stonebreak)",
    title: "Song Đầu May Mắn - Bậc Thầy Vận May Cổ Đại",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Công Nghệ Cổ Tộc & Tinh Nghịch",
    image: "/assets/dota/ogre-magi.webp",
    meaning: "Người khổng lồ hai đầu độc nhất vô nhị của giống loài Ogre đần độn nhưng được Nữ thần Vận May mỉm cười trọn đời. Ném hỏa cầu nổ tung, kích thích đồng minh bằng Máu Điên (Bloodlust) và kích hoạt nội tại May Mắn Đa Bội (Multicast) nhân bốn lần phép thuật tạo nên những chuỗi sát thương bùng nổ kỳ diệu.",
    rarity: "Huyền Thoại May Mắn",
    element: "Song Đầu Ma Lực · Multicast Vạn Phúc"
  },
  {
    name: "Phantom Assassin (Mortred)",
    title: "Sát Thủ Vô Ảnh - Lưỡi Kiếm Mạng Che Mặt Veiled Sisters",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/phantom-assassin.webp",
    meaning: "Sát thủ thầm lặng thuộc hội nữ tu Mạng Che Mặt, không tên tuổi, không nhân dạng, chỉ hành động theo lời sấm truyền của Đấng Tiên Tri. Ẩn mình trong màn sương mờ ảo (Blur), ném phi tiêu kịch độc làm chậm đối phương, áp sát chớp nhoáng (Phantom Strike) và kết liễu bằng cú Bạo Kích Đẫm Máu (Coup de Grâce) đỏ rực màn hình.",
    rarity: "Chí Tôn Sát Thủ",
    element: "Vô Ảnh Xuất Quỷ · Coup de Grâce"
  },
  {
    name: "Pudge (The Butcher)",
    title: "Đồ Tể Móc Xích - Cơn Ác Mộng Đầm Lầy Butcher",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Quân Đoàn Tử Vong · Lãnh Địa Bất Tử",
    image: "/assets/dota/pudge.webp",
    meaning: "Gã đồ tể khét tiếng của chiến trường Quoath, lang thang giữa đống xác rữa không ngừng nuốt trọn sinh mệnh. Sở hữu cú phóng Móc Xích Thịt Rữa (Meat Hook) kinh hoàng kéo nạn nhân về từ khoảng cách mù mịt, phân rã thịt thối (Rot) làm chậm và thi triển cú Cắn Xé Điên Cuồng (Dismember) đoạt mạng kẻ thù trong đau đớn tột cùng.",
    rarity: "Chí Tôn Đồ Tể",
    element: "Móc Xích Rỉ Sét · Thịt Rữa Tử Khí"
  },
  {
    name: "Pugna (The Nether Grandmaster)",
    title: "U Hồn Lạc Lối - Đại Sư Ma Pháp Âm Giới Nether",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/pugna.webp",
    meaning: "Bộ xương phù thủy nhỏ bé tinh quái nhưng mang sức mạnh pháp thuật Nether khủng khiếp từ khi còn nằm trong nôi. Bắn Nổ Hư Không (Nether Blast) san phẳng công trình, cắm Cọc Ma Thuật (Nether Ward) phản phệ mana đối thủ và hút cạn sinh khí Life Drain truyền máu cho đồng đội.",
    rarity: "Huyền Thoại Pháp Sư",
    element: "U Minh Lục Hỏa · Cọc Ma Nether Ward"
  },
  {
    name: "Queen of Pain (Akasha)",
    title: "Nữ Hoàng Thống Khổ - Tiếng Hét Hủy Diệt Cõi Âm",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/queen-of-pain.webp",
    meaning: "Nữ quỷ quyến rũ được triệu hồi bởi vua Bha'al nhằm ban phát nỗi đau đớn khoái lạc nhưng cuối cùng đã phản bội và xé xác kẻ giam cầm mình. Dịch chuyển Blink chớp nhoáng, ném dao găm kịch độc và cất lên Tiếng Hét Sóng Siêu Âm (Sonic Wave) xé toạc màng nhĩ và nội tạng mọi kẻ ngáng đường.",
    rarity: "Chí Tôn Ác Nữ",
    element: "Thống Khổ Âm Ba · Sonic Wave Hủy Diệt"
  },
  {
    name: "Riki (The Stealth Assassin)",
    title: "Ẩn Thích Thần Thâu - Hoàng Tử Tàng Hình Xứ Tahlin",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/riki.webp",
    meaning: "Hoàng tử thứ hai của hoàng gia Tahlin, kẻ sống sót duy nhất sau đêm thảm sát đẫm máu nhờ học được bí thuật tàng hình vĩnh cửu. Thả Bom Khói (Smoke Screen) làm mù và câm lặng kẻ địch, nhảy múa luồn lách ra sau lưng tung cú Đâm Lén Tử Thần (Backstab) đoạt mạng con mồi không tiếng động.",
    rarity: "Huyền Thoại Sát Thủ",
    element: "Vô Ảnh Đâm Lén · Bom Khói Tử Thần"
  },
  {
    name: "Rubick (The Grand Magus)",
    title: "Đại Pháp Sư Trộm Phép - Con Trai Pháp Sư Aghanim",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/rubick.webp",
    meaning: "Thiên tài ma thuật quái kiệt, con trai của huyền thoại Aghanim, kẻ đã đánh bại hàng chục pháp sư quyền năng trong một ngày để giành lấy danh hiệu Grand Magus. Nhấc bổng kẻ thù bằng Telekinesis, phóng Sợi Xích Năng Lượng làm suy yếu đối phương và thi triển Tuyệt Kỹ Trộm Phép (Spell Steal) dùng chính chiêu thức của địch để đánh bại chúng.",
    rarity: "Chí Tôn Ma Thuật",
    element: "Lục Quang Huyền Thuật · Trộm Phép Spell Steal"
  },
  {
    name: "Shadow Fiend (Nevermore)",
    title: "Ma Thần Đoạt Hồn - Tử Thần Vực Thẳm Nevermore",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/shadow-fiend.webp",
    meaning: "Thực thể tàn bạo thu thập linh hồn đến từ đáy sâu Vực Thẳm. Càng tước đoạt nhiều sinh mệnh, sức mạnh hắc ám càng bùng nổ, tung ba làn sóng Bóng Đêm Vung Kiếm (Shadowraze) chuẩn xác đến rợn người và giải phóng Khúc Hát Đoạt Hồn (Requiem of Souls) biến bầu trời thành biển hắc ám thiêu rụi tâm can kẻ địch.",
    rarity: "Chí Tôn Ma Thần",
    element: "Đoạt Hồn Hắc Ám · Requiem of Souls"
  },
  {
    name: "Silencer (Nortrom)",
    title: "Pháp Sư Câm Lặng - Khắc Tinh Ma Thuật Học Viện Aeol Drias",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/silencer.webp",
    meaning: "Học viên bị coi thường của học viện ma thuật cổ xưa vì không thể niệm các câu thần chú thông thường, nhưng thực chất lại nắm giữ bí kỹ cấm kỵ: câm lặng mọi dòng chảy năng lượng. Ném glaive trí tuệ đánh cắp vĩnh viễn trí thông minh kẻ thù và cất tiếng gầm Câm Lặng Toàn Thế Giới (Global Silence) dập tắt mọi thần chú trong giao tranh.",
    rarity: "Chí Tôn Học Giả",
    element: "Tịnh Tâm Trí Tuệ · Global Silence Vô Thanh"
  },
  {
    name: "Skywrath Mage (Dragonus)",
    title: "Thần Binh Ma Pháp Bầu Trời - Tình Yêu Vĩnh Hằng Cõi Ghastly Eyrie",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/skywrath-mage.webp",
    meaning: "Đại pháp sư trung thành của triều đình vương quốc bầu trời Ghastly Eyrie, mang trong lòng mối tình bi thương sâu nặng với nàng công chúa bị phản bội Vengeful Spirit. Bắn Hỏa Cầu Bí Thuật Arcane Bolt, trói buộc phong ấn phép thuật đối thủ và trút xuống Cột Sáng Huyền Bí (Mystic Flare) thiêu rụi mục tiêu trong nháy mắt.",
    rarity: "Huyền Thoại Pháp Sư",
    element: "Thiên Giới Lam Quang · Mystic Flare Thần Thoại"
  },
  {
    name: "Slardar (The Slithereen Guard)",
    title: "Hộ Vệ Biển Sâu - Chiến Tướng Đèn Lồng Tộc Slithereen",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/slardar.webp",
    meaning: "Thống lĩnh đội vệ binh biển sâu kiên cường canh giữ kho báu chìm dưới đáy đại dương ngàn dặm. Trườn nhanh trên cạn xé toạc mặt đất, dậm đuôi nghiền nát con mồi (Slithereen Crush), đánh choáng liên hoàn và soi sáng điểm yếu bằng Đèn Lồng Ăn Mòn Giáp (Corrosive Haze) khiến mọi phòng thủ đối phương vỡ vụn.",
    rarity: "Huyền Thoại Biển Sâu",
    element: "Hải Thần Tam Xoa · Đèn Lồng Xuyên Giáp"
  },
  {
    name: "Slark (The Nightcrawler)",
    title: "Kẻ Vượt Ngục Tối Tăm - Tên Trộm Ranh Mãnh Nhà Tù Dark Reef",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/slark.webp",
    meaning: "Kẻ duy nhất trong lịch sử trốn thoát thành công khỏi nhà tù ngục tối dưới đáy biển sâu Dark Reef bất khả xâm phạm. Dùng lưỡi dao gỉ sắt hút cạn chỉ số sức mạnh nạn nhân (Essence Shift), trói chặt con mồi bằng sợi xích Pounce và ẩn mình trong Đám Mây Bóng Tối (Shadow Dance) hồi phục sinh lực thần tốc không thể bị chọn làm mục tiêu.",
    rarity: "Huyền Thoại Thích Khách",
    element: "Bóng Tối Dark Reef · Essence Shift Đoạt Lực"
  },
  {
    name: "Snapfire (Beatrix Snapfire)",
    title: "Lão Bà Rồng Bánh Nướng - Hỏa Pháo Sa Mạc NanRee",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Công Nghệ Cổ Tộc & Tinh Nghịch",
    image: "/assets/dota/snapfire.webp",
    meaning: "Bà cụ tộc Keen vui tính nhưng cực kỳ nguy hiểm, cưỡi trên lưng chú thằn lằn rồng phun nham thạch Mortimer đáng yêu. Nướng bánh quy tăng lực cho đồng minh, xả súng ngắn tán xạ nát mặt quân thù và phóng liên hoàn những quả cầu lửa nung chảy Mortimer Kisses từ khoảng cách cực xa.",
    rarity: "Huyền Thoại Pháo Thủ",
    element: "Hỏa Pháo Magma · Bánh Quy Siêu Cấp"
  },
  {
    name: "Sniper (Kardel Sharpeye)",
    title: "Thần Xạ Knollen - Tay Súng Bắn Tỉa Huyền Thoại",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/sniper.webp",
    meaning: "Thợ săn kiệt xuất của bộ tộc Keen vùng núi cao Knollen, người bắn trúng mắt con thú huyền thoại từ khoảng cách vạn trượng để hoàn thành lời sấm truyền. Rải mảnh bom Shrapnel làm chậm diện rộng, bắn tỉa tầm xa vượt ngoài tầm nhìn kẻ thù và ngắm bắn Ám Sát Tử Thần (Assassinate) bách phát bách trúng.",
    rarity: "Huyền Thoại Xạ Thủ",
    element: "Đạn Khí Xuyên Tầm · Assassinate Đoạt Mạng"
  },
  {
    name: "Spectre (Mercurial)",
    title: "U Linh Tàn Ảnh - Bản Thể Vụn Vỡ Cõi Tinh Vân",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/spectre.webp",
    meaning: "Một thực thể năng lượng thuần khiết bị phân rã rơi vào thế giới vật chất, khao khát tìm lại sự thống nhất trọn vẹn của linh hồn. Phóng Tàn Ảnh U Linh (Spectral Dagger) băng qua mọi chướng ngại, phân tán sát thương ra xung quanh bằng Giáp Tản Lực (Dispersion) và phân thân Haunt giáng thế áp sát toàn bộ quân thù cùng lúc.",
    rarity: "Chí Tôn Tinh Linh",
    element: "U Tinh Tản Ảnh · Haunt Giáng Thế Vô Biên"
  },
  {
    name: "Sven (The Rogue Knight)",
    title: "Kỵ Sĩ Bất Tuân - Cự Kiếm Công Lý Huyết Thống Bán Thần",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/sven.webp",
    meaning: "Đứa con lai giữa hiệp sĩ Vigil và tộc người cá Meranth, kẻ phá vỡ giáo điều để bảo vệ danh dự bản thân cùng thanh cự kiếm Outcast Blade. Phóng Búa Sét Bão Tố (Storm Hammer) gây choáng hàng loạt kẻ thù, rèn giáp kiên cố và khai mở Sức Mạnh Thần Linh (God's Strength) nhân bội sát thương chém tan nát tiền tuyến địch thủ.",
    rarity: "Chí Tôn Chiến Thần",
    element: "Lôi Chấn Cự Kiếm · God's Strength Cuồng Nộ"
  },
  {
    name: "Templar Assassin (Lanaya)",
    title: "Bí Mật Đền Thờ - Lưỡi Dao Tâm Linh Đền Ẩn Mật Hidden Temple",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Sát Thủ Bóng Đêm & Hải Vực Bí Ẩn",
    image: "/assets/dota/templar-assassin.webp",
    meaning: "Học giả tò mò dành cả thanh xuân khám phá quy luật tự nhiên trước khi được khai sáng tại Đền Ẩn Mật bí ẩn. Tạo màng bảo hộ Khúc Xạ Tâm Linh (Refraction) chặn đứng sát thương và gia tăng đòn đánh, phóng Lưỡi Dao Psi xuyên thấu nhiều mục tiêu và đặt bẫy Psionic Trap giăng lưới con mồi.",
    rarity: "Huyền Thoại Sát Thủ",
    element: "Tâm Linh Khúc Xạ · Psi Blades Xuyên Thấu"
  },
  {
    name: "Terrorblade",
    title: "Ác Ma Phản Chiếu - Chúa Tể Ngục Tối Foulfell",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/terrorblade.webp",
    meaning: "Kẻ cướp bóc dị giáo ngỗ ngược bị đày xuống ngục tối Foulfell nơi gương ma phản chiếu tội ác. Hắn thuần hóa bóng đen của chính mình, phân tách vô số ảo ảnh ma quái, biến hình thành Đại Ma Vương Tầm Xa (Metamorphosis) và thi triển Hoán Đổi Sinh Mệnh (Sunder) tước đoạt lượng máu kẻ thù để đảo ngược thế cờ.",
    rarity: "Chí Tôn Ác Ma",
    element: "Ảnh Kính Phản Ma · Hoán Mệnh Sunder"
  },
  {
    name: "Thrall (Warchief of the Horde)",
    title: "Đại Tù Trưởng Bộ Tộc Orc - Shaman Sấm Sét Khởi Nguyên DotA",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/thrall.webp",
    meaning: "Vị lãnh tụ vĩ đại giải phóng bộ tộc Orc khỏi xiềng xích ma quỷ Fel, người hợp nhất các chủng tộc tại Kalimdor và là hình mẫu nguyên bản của Disruptor trong DotA Allstars. Nắm giữ búa thần Doomhammer oai nghiêm, triệu hồi sức mạnh linh hồn đại địa và sấm sét dẫn lối cho đồng minh đến chiến thắng vẻ vang.",
    rarity: "Chí Tôn Tù Trưởng",
    element: "Doomhammer Thần Khí · Lôi Sấm Đại Địa"
  },
  {
    name: "Timbersaw (Rizzrack)",
    title: "Cưa Máy Cuồng Bạo - Nỗi Ám Ảnh Rừng Rậm Rizzrack",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Công Nghệ Cổ Tộc & Tinh Nghịch",
    image: "/assets/dota/timbersaw.webp",
    meaning: "Kỹ sư tộc Keen phát điên vì chứng sợ cây cối sau khi chứng kiến quê hương Augury Bay bị rừng rậm nuốt chửng. Tự chế tạo bộ giáp cưa máy cơ giới chạy bằng hơi nước, phóng dây móc Timber Chain đu lượn giữa các tán cây, xoay Lưỡi Cưa Xoay Tròn (Chakram) xé nát tiền tuyến quân địch.",
    rarity: "Huyền Thoại Cơ Giới",
    element: "Cưa Máy Cơ Khí · Chakram Phân Cắt"
  },
  {
    name: "Tinker (Boush)",
    title: "Kỹ Sư Ma Kỹ Tối Tân - Đỉnh Cao Khoa Học Phòng Thí Nghiệm Yurn",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Công Nghệ Cổ Tộc & Tinh Nghịch",
    image: "/assets/dota/tinker.webp",
    meaning: "Nhà khoa học sống sót sau sự cố cổng không gian nổ tung tại phòng thí nghiệm dưới lòng đất Violet Plateau. Sử dụng tia Laser làm mù mắt, phóng tên lửa tầm nhiệt Heat-Seeking Missile và kích hoạt Cỗ Máy Tái Khởi Động (Rearm) hồi chiêu toàn bộ trang bị kỹ năng tạo nên nhịp bắn phá không hồi kết.",
    rarity: "Chí Tôn Kỹ Sư",
    element: "Tia Sáng Laser · Rearm Tái Khởi Tạo"
  },
  {
    name: "Tiny (The Stone Giant)",
    title: "Thạch Thể Cự Nhân - Tinh Thể Khổng Lồ Núi Đá",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/tiny.webp",
    meaning: "Một mảnh đá nhỏ bé thức tỉnh linh hồn, lang thang khắp thế giới để tìm kiếm nguồn gốc sinh thành và không ngừng lớn mạnh. Ném kẻ thù vào không trung (Toss), giáng trận mưa đá Lở Tuyết (Avalanche) chôn vùi đối thủ, nhổ bật gốc cây đại thụ làm gậy quật tan hoang cả căn cứ quân thù.",
    rarity: "Huyền Thoại Cự Thể",
    element: "Thạch Bàn Đại Địa · Avalanche Động Đất"
  },
  {
    name: "Troll Warlord (Jah'rakal)",
    title: "Cuồng Chiến Bộ Tộc Troll - Bất Diệt Ý Chí Giận Dữ",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/troll.webp",
    meaning: "Chiến binh cộc cằn bị trục xuất khỏi chính bộ tộc Troll vì tính khí quá hung hăng, thề một mình đánh bại cả thế giới để chứng minh sức mạnh. Chuyển đổi linh hoạt giữa rìu ném tầm xa và rìu cận chiến chém xoáy, khóa chân đối thủ và kích hoạt Cuồng Nộ Bất Tử (Battle Trance) chém điên cuồng không thể bị hạ gục.",
    rarity: "Huyền Thoại Cuồng Chiến",
    element: "Song Rìu Cuồng Bạo · Battle Trance Bất Tử"
  },
  {
    name: "Tusk (Ymir)",
    title: "Đấm Thép Băng Nguyên - Quyền Vương Quán Rượu Rime",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/tusk.webp",
    meaning: "Gã hải mã hào sảng vô địch mọi cuộc ẩu đả tại các quán rượu vùng băng tuyết Barrier, luôn tìm kiếm những trận đấu lớn hơn. Lăn Quả Cầu Tuyết (Snowball) cuốn theo toàn bộ đồng minh lao vào kẻ địch, dựng Băng Đăng ngăn lối và tung Cú Đấm Móc Ngàn Cân Walrus PUNCH hất văng đối thủ lên chín tầng mây.",
    rarity: "Huyền Thoại Quyền Vương",
    element: "Quyền Vương Băng Giá · Walrus PUNCH Nốc Ao"
  },
  {
    name: "Tyrande Whisperwind",
    title: "Nữ Tế Tối Cao Ánh Trăng Elune - Nữ Chúa Rừng Rậm Ashenvale",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/tyrande-whisperwind.webp",
    meaning: "Lãnh tụ tối cao của người Dạ Tiên Night Elf trong Warcraft, hình mẫu nền tảng tạo nên Priestess of the Moon (Mirana) trong DotA cổ xưa. Cưỡi bạch hổ oai vệ, giương cung ánh sáng của nữ thần Elune triệu hồi Mưa Sao Băng Starfall và dẫn dắt các chiến binh hộ vệ rừng thiêng bảo vệ thế giới.",
    rarity: "Chí Tôn Nữ Tế",
    element: "Bạch Nguyệt Thần Lực · Mưa Sao Băng Starfall"
  },
  {
    name: "Underlord (Vrogros)",
    title: "Chúa Tể Địa Ngục Hố Đen - Quân Đoàn Dung Nham Vực Sâu",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/underlord.webp",
    meaning: "Bạo chúa tàn độc chỉ huy quân đoàn quỷ dưới lòng sâu lòng đất Azorith, tiến lên mặt đất để biến thế giới thành biển lửa. Gọi Mưa Hỏa Ngục (Firestorm) thiêu đốt máu tối đa, trói chân bằng Hố Bẫy Dung Nham và mở Cổng Dịch Chuyển Hư Không (Dark Rift / Fiend's Gate) đưa toàn đội quân thâm nhập căn cứ kẻ thù.",
    rarity: "Chí Tôn Ma Vương",
    element: "Hỏa Ngục Dung Nham · Hư Không Môn Cảnh"
  },
  {
    name: "Undying (Dirge)",
    title: "Thi Hài Khát Máu Bất Tử - Khúc Ca Bi Tráng Thần Chết Dead God",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Quân Đoàn Tử Vong · Lãnh Địa Bất Tử",
    image: "/assets/dota/undying.webp",
    meaning: "Chiến binh bị ném vào hố chôn tập thể của Vị Thần Chết, linh hồn bị xé toạc trở thành sứ giả ca tụng cái chết vĩnh hằng. Hút cạn sức mạnh Decay đối phương, cắm Ngôi Mộ Bia Thiêng (Tombstone) triệu hồi vô số xác sống bò lên nuốt chửng quân thù và hóa thân thành Huyết Nhục Cự Ma gieo rắc dịch bệnh.",
    rarity: "Huyền Thoại Tử Khí",
    element: "Mộ Bia Tử Thi · Huyết Ma Cương Thi"
  },
  {
    name: "Ursa (Ulfsaar)",
    title: "Gấu Chiến Băng Giá - Thần Thú Bảo Vệ Bộ Tộc Gấu Ursine",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/ursa.webp",
    meaning: "Chiến binh dũng mãnh nhất của bộ tộc gấu Ursine, sẵn sàng xé xác bất cứ kẻ nào dám đe dọa sự bình yên của rừng già và đàn con thơ. Tăng tốc độ cào cấu điên cuồng (Overpower), khắc sâu Vết Cào Xé Thịt (Fury Swipes) tăng lũy tiến sát thương và kích hoạt Cơn Điên Cuồng Nộ (Enrage) giảm 80% sát thương đè bẹp cả Roshan.",
    rarity: "Huyền Thoại Chiến Hùng",
    element: "Vuốt Băng Cuồng Cào · Fury Swipes Xé Thịt"
  },
  {
    name: "Uther the Lightbringer",
    title: "Thánh Ngân Kỵ Sĩ Chi Thủ - Hiệp Sĩ Ánh Sáng Vĩ Đại Bậc Nhất",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Huyền Thoại Warcraft · DotA Khởi Nguyên",
    image: "/assets/dota/uther-the-lightbringer.webp",
    meaning: "Thống soái đầu tiên của Hội Hiệp Sĩ Bàn Tay Bạc (Knights of the Silver Hand) trong Warcraft, nguồn cảm hứng nguyên bản tạo nên Omniknight (Purist Thunderwrath) trong DotA. Cầm búa thánh ban phát ánh sáng thanh tẩy chữa lành vết thương, dựng khiên hộ mệnh miễn nhiễm vật lý và bảo vệ công lý đến hơi thở cuối cùng.",
    rarity: "Chí Tôn Thánh Tăng",
    element: "Thánh Quang Hộ Thể · Ngân Bạc Thánh Búa"
  },
  {
    name: "Venomancer (Lesale Deathbringer)",
    title: "Độc Xà Rừng Sâu Axia - Kẻ Nuốt Chửng Vạn Độc",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/venomancer.webp",
    meaning: "Nhà thảo dược học xấu số bị rắn độc cắn và rơi vào rừng rậm Axia đầy chất độc hữu cơ, biến dị thành một loài bò sát lai thực vật mang độc tính kinh hoàng nhất thế giới. Cắm Rắn Phun Độc (Plague Ward) khắp bản đồ, phun nọc độc làm tê liệt và nổ tung Bão Cực Độc (Poison Nova) rút cạn sinh lực kẻ thù.",
    rarity: "Huyền Thoại Độc Thú",
    element: "Vạn Độc Ăn Mòn · Poison Nova Bão Độc"
  },
  {
    name: "Viper (The Netherdrake)",
    title: "Hắc Long Độc Xà - Cơn Ác Mộng Vực Sâu Netherdrake",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Dire · Ma Vương Vực Thẳm",
    image: "/assets/dota/viper.webp",
    meaning: "Con rồng độc hung dữ bị ma thuật Pugna thuần hóa nhưng đã xé toạc xiềng xích bay lên bầu trời gieo rắc chất độc ăn mòn. Bắn Đạn Độc Nhổ Axit (Poison Attack), phủ Vũng Độc Nether Nethertoxin khóa nội tại kẻ thù và phóng Độc Châm Chí Mạng (Viper Strike) làm chậm tê liệt con mồi đến chết.",
    rarity: "Huyền Thoại Hắc Long",
    element: "Hắc Long Kịch Độc · Nethertoxin Axit"
  },
  {
    name: "Visage (Necro'lic)",
    title: "Thủ Hộ Mê Cung Thu Hồn - Thần Điêu Cổng Hẹp Narrow Maze",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Quân Đoàn Tử Vong · Lãnh Địa Bất Tử",
    image: "/assets/dota/visage.webp",
    meaning: "Linh hồn hình thú bay lượn trên đỉnh ngục tối Mê Cung Hẹp (Narrow Maze), canh giữ không cho bất kỳ vong linh nào trốn thoát về cõi trần. Bắn Tích Tụ Hồn Phách (Soul Assumption), làm chậm đối thủ, tạo lớp giáp linh hồn bất hoại và triệu hồi cặp Chim Điêu Hộ Vệ (Familiars) dậm đá làm choáng đối phương.",
    rarity: "Huyền Thoại Minh Thú",
    element: "U Hồn Mê Cung · Điêu Thần Hộ Pháp"
  },
  {
    name: "Void Spirit (Inai)",
    title: "Thần Linh Cõi Hư Không - Đấng Tối Cao Của Tứ Đại Thần Linh",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/void-spirit.webp",
    meaning: "Người anh cả uyên bác và bí ẩn nhất trong Tứ Đại Tinh Linh (Four Spirits), ẩn mình nơi ngã rẽ của hư không để theo dõi các dòng thời gian của vũ trụ. Phóng Khí Hư Không (Aether Remnant), ẩn mình vào Cổng Hư Vô Dissimilate và vung trượng lướt Chém Sao Băng (Astral Step) xé toạc không gian đa chiều.",
    rarity: "Chí Tôn Thần Linh",
    element: "Hư Không Đa Chiều · Astral Step Vô Ảnh"
  },
  {
    name: "Warlock (Demnok Lannik)",
    title: "Đại Pháp Sư Hắc Thuật - Kẻ Nắm Giữ Cuốn Sách Ultimyr",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/warlock.webp",
    meaning: "Trưởng quản thư viện cổ kính của Học viện Tối Cao Ultimyr, kẻ đã lén đọc những trang cấm thư ma thuật hắc ám bị phong ấn. Nối Dây Xích Vận Mệnh (Fatal Bonds) chia sẻ sát thương giữa các mục tiêu, làm chậm kẻ thù bằng bãi bùn đen và triệu hồi Người Đá Khổng Lồ Hỏa Ngục (Chaotic Offering Golem) rơi từ trời giáng đòn hủy diệt.",
    rarity: "Huyền Thoại Thuật Sĩ",
    element: "Hắc Ma Thư Cổ · Triệu Hồi Golem Ma Vương"
  },
  {
    name: "Weaver (Skitskurr)",
    title: "Kẻ Dệt Vải Không Gian - Bậc Thầy Sợi Chỉ Thời Gian",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/weaver.webp",
    meaning: "Nghệ nhân kiến tạo chịu trách nhiệm bảo dưỡng các sợi chỉ không gian của tấm thảm thực tại vũ trụ. Do quá say mê sáng tạo những vết rách mới nên đã bị trục xuất, tự do lướt đi trong bóng hình Sukuchi siêu tốc độ, thả bọ hung gặm nhấm giáp và quay ngược thời gian đảo ngược sinh mệnh (Time Lapse).",
    rarity: "Thần Thoại Dệt Không",
    element: "Sợi Chỉ Thời Gian · Time Lapse Hoàn Nguyên"
  },
  {
    name: "Windranger (Lyralei)",
    title: "Thiện Xạ Cung Phong - Đứa Con Của Thần Gió Bão",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Radiant · Vệ Binh Ánh Sáng",
    image: "/assets/dota/windranger.webp",
    meaning: "Cô gái mồ côi may mắn được ngọn gió bão nhận nuôi và bao bọc sau khi ngôi làng bị bão tố tàn phá. Bắn Mũi Tên Gió Trói Chân (Shackleshot) găm hai kẻ địch lại với nhau, bắn Mũi Tên Thần Lực xuyên ngàn dặm, lướt gió Windrun né tránh mọi đòn tấn công và xả đạn bắn tên liên thanh Bão Lốc (Focus Fire) hủy diệt mục tiêu đơn lẻ.",
    rarity: "Huyền Thoại Xạ Thủ",
    element: "Cuồng Phong Cung Tiễn · Focus Fire Liên Thanh"
  },
  {
    name: "Winter Wyvern (Auroth)",
    title: "Băng Long Thi Ca - Nhà Thơ Cổ Đại Đỉnh Núi Băng Eldwurm",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/winter-wyvern.webp",
    meaning: "Cổ long băng giá thông thái yêu thích thi ca và thu thập những cuốn sách quý hiếm hơn là kho báu vàng bạc. Bay vút lên không trung thiêu đốt mục tiêu bằng hơi thở băng tuyết, hồi máu đóng băng đồng minh và thi triển Lời Nguyền Băng Giá (Winter's Curse) khiến toàn bộ đồng đội của mục tiêu quay sang cắn xé lẫn nhau.",
    rarity: "Chí Tôn Cổ Long",
    element: "Băng Tuyết Thi Ca · Winter's Curse Lời Nguyền"
  },
  {
    name: "Witch Doctor (Zakarum)",
    title: "Thầy Mo Voodoo - Lời Nguyền Trượng Đầu Lâu Bộ Lạc",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Bậc Thầy Ma Thuật & Học Viện Ma Pháp",
    image: "/assets/dota/witch-doctor.webp",
    meaning: "Thầy phù thủy Voodoo lập dị lang thang khắp các đầm lầy với chiếc trượng đầu lâu và những chiếc lọ độc dược kỳ bí. Ném Chiếc Đầu Lâu Nảy Gây Choáng (Paralyzing Cask) liên hoàn, nhảy múa hồi máu đồng minh, ếm Lời Nguyền Nổ Thịt Maledict và dựng Cọc Bắn Đạn Ma Thuật (Death Ward) quét sạch kẻ địch trong điệu nhảy ma quái.",
    rarity: "Huyền Thoại Thầy Mo",
    element: "Voodoo Ma Thuật · Death Ward Trượng Nguyền"
  },
  {
    name: "Wraith King (Ostarion)",
    title: "Bạch Cốt Minh Vương - Vua Tái Sinh Bất Tử",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Quân Đoàn Tử Vong · Lãnh Địa Bất Tử",
    image: "/assets/dota/wraith-king.webp",
    meaning: "Vị vua vĩ đại xây dựng đế chế từ xương cốt và linh hồn u uất, khao khát trường sinh bất tử qua ngàn vạn năm. Triệu hồi đội quân hài cốt ma quỷ quấy nhiễu quân thù, tung Búa Tử Hồn khóa chặt con mồi và sở hữu quyền năng Luân Hồi Tái Sinh (Reincarnation) sống lại ngay tại chỗ khiến kẻ địch tuyệt vọng.",
    rarity: "Chí Tôn Hoàng Đế",
    element: "Bạch Cốt Tái Sinh · Minh Giới Vương Khí"
  },
  {
    name: "Zeus (The Lord of Heaven)",
    title: "Chúa Tể Sấm Sét - Vua Thần Đỉnh Núi Olympus",
    category: "dota",
    categoryLabel: "Dota 2 Huyền Thoại",
    faction: "Thực Thể Vũ Trụ & Cổ Đại Thần Linh",
    image: "/assets/dota/zeus.webp",
    meaning: "Vua của các vị thần trên đỉnh Olympus tối cao, bị vợ đày xuống trần gian nhưng vẫn giữ trọn quyền năng sấm sét vô song. Phóng Hồ Quang Sét (Arc Lightning) giật liên hoàn, giáng Sấm Sét Thần Thánh (Lightning Bolt) làm lộ diện kẻ tàng hình và cất tiếng sấm Gọi Sấm Toàn Bản Đồ (Thundergod's Wrath) đánh trúng mọi tướng địch trên toàn chiến trường.",
    rarity: "Chí Tôn Thần Vương",
    element: "Olympus Thần Lôi · Thundergod's Wrath Thiên Phạt"
  }
];

// 1. Verify that all 68 files in public/assets/dota are matched
const dotaAssetFiles = fs.readdirSync('public/assets/dota');
console.log(`Found ${dotaAssetFiles.length} files in public/assets/dota.`);

const mappedAssetNames = new Set(dotaCharacters.map(c => path.basename(c.image)));

const missingFromDota = dotaAssetFiles.filter(f => !mappedAssetNames.has(f));
if (missingFromDota.length > 0) {
  console.error("ERROR: These files in public/assets/dota are not mapped:", missingFromDota);
  process.exit(1);
}

const extraInMap = dotaCharacters.filter(c => !dotaAssetFiles.includes(path.basename(c.image)));
if (extraInMap.length > 0) {
  console.error("ERROR: These mapped characters have no file in public/assets/dota:", extraInMap.map(c => c.image));
  process.exit(1);
}

console.log("All 68 files in public/assets/dota perfectly match 1-to-1!");

// 2. Assign IDs (DT-01 to DT-68)
const dotaWithIds = dotaCharacters.map((c, idx) => {
  const num = idx + 1;
  const idStr = num < 10 ? `DT-0${num}` : `DT-${num}`;
  return {
    id: idStr,
    ...c
  };
});

// 3. Write src/data/chibi/dota.json
fs.writeFileSync('src/data/chibi/dota.json', JSON.stringify(dotaWithIds, null, 2), 'utf-8');
console.log(`Written src/data/chibi/dota.json with ${dotaWithIds.length} characters.`);

// 4. Rebuild all_chibi.json with ALL categories
const allCategories = [
  'than_gioi',
  'tay_du',
  'ma_gioi',
  'viet_nam',
  'tam_quoc',
  'kim_dung',
  'phong_van',
  'wwe',
  'lien_minh',
  'dota',
  'manga_anime',
  'the_thao'
];

let allCards = [];
for (const cat of allCategories) {
  const filePath = `src/data/chibi/${cat}.json`;
  if (fs.existsSync(filePath)) {
    const list = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allCards = allCards.concat(list);
    console.log(`- ${cat}: ${list.length} cards`);
  } else {
    console.warn(`Warning: File ${filePath} not found!`);
  }
}

fs.writeFileSync('src/data/chibi/all_chibi.json', JSON.stringify(allCards, null, 2), 'utf-8');
console.log(`\nSuccessfully rebuilt src/data/chibi/all_chibi.json with total: ${allCards.length} cards!`);
