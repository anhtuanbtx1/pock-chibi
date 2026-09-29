const fs = require('fs');
const path = require('path');

// 85 new champions data
const newChampions = [
  {
    name: "Akshan",
    title: "Vệ Binh Ranh Mãnh - Thợ Săn Báo Thù",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/akshan.webp",
    meaning: "Thành viên ngang tàng của Hội Vệ Binh Ánh Sáng vùng Shurima, mang khẩu súng móc đu dây linh hoạt và khẩu súng cổ vật Trừng Phạt Thần Thánh. Sẵn sàng báo thù những kẻ gieo rắc cái chết để hồi sinh những đồng đội đã ngã xuống trong chớp mắt.",
    rarity: "Huyền Thoại Vệ Binh",
    element: "Súng Móc Đu Dây · Vũ Khí Trừng Phạt Thần Thánh"
  },
  {
    name: "Amumu",
    title: "Xác Ướp U Sầu - Lời Nguyền Cô Độc Bất Tận",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/amumu.webp",
    meaning: "Một linh hồn cô đơn nhỏ bé từ Shurima cổ đại, bị nguyền rủa phải vĩnh viễn lang thang trong nỗi tuyệt vọng và bi ai. Bất cứ ai chạm vào cậu đều bị cái chết và đau thương nuốt chửng, phóng ra những dải băng quấn chặt và giải phóng Lời Nguyền Xác Ướp U Sầu (Curse of the Sad Mummy) phong ấn toàn bộ xung quanh.",
    rarity: "Thần Thoại Cổ Xưa",
    element: "Lời Nguyền Băng Bó · Lời Nguyền Xác Ướp U Sầu"
  },
  {
    name: "Anivia",
    title: "Phượng Hoàng Băng - Hộ Thần Mùa Đông Bất Tử",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/anivia.webp",
    meaning: "Bán Thần cổ xưa hiện thân cho mùa đông khắc nghiệt và chu kỳ tái sinh vĩnh hằng của Freljord. Khi ngã xuống, linh hồn nàng hóa thành quả trứng băng chờ đợi ngày thức tỉnh, tạo nên Tường Băng ngăn cách kẻ thù và triệu hồi Bão Tuyết (Glacial Storm) đóng băng mọi bước tiến của quân xâm lược.",
    rarity: "Chí Tôn Bán Thần",
    element: "Băng Tuyết Vĩnh Cửu · Bão Tuyết Luân Hồi"
  },
  {
    name: "Annie",
    title: "Đứa Trẻ Bóng Tối - Ma Hỏa Tibbers",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/annie.webp",
    meaning: "Cô bé ma thuật sở hữu năng lượng hỏa thuật khủng khiếp ẩn sau vẻ ngoài ngây thơ nơi rừng rậm Noxus. Ôm trên tay chú gấu bông Tibbers có linh hồn ác quỷ, sẵn sàng biến hóa thành một con gấu lửa khổng lồ giáng thế thiêu rụi và làm choáng toàn bộ đội hình đối phương.",
    rarity: "Chí Tôn Pháp Sư",
    element: "Hỏa Ma Thần Đồng · Triệu Hồi Gấu Lửa Tibbers"
  },
  {
    name: "Aurelion Sol",
    title: "Ác Long Thượng Giới - Đấng Kiến Tạo Thiên Hà",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đỉnh Núi Linh Thiêng Targon",
    image: "/assets/aurelion_sol.webp",
    meaning: "Vị thần rồng thượng giới cổ xưa kiến tạo nên muôn vàn vì sao lấp lánh trên bầu trời đêm. Từng bị các Thượng Nhân Targon lừa gạt đeo vương miện nô dịch, nay đã thức tỉnh để trút giận lên cõi trần bằng Hơi Thở Tinh Vân và triệu hồi Thiên Thạch Khổng Lồ đè bẹp cả một lục địa.",
    rarity: "Chí Tôn Tinh Linh Vũ Trụ",
    element: "Tinh Vân Thần Hỏa · Thiên Thạch Rơi Tự Do"
  },
  {
    name: "Bard",
    title: "Ông Già Tuyết Tinh Linh - Người Bảo Hộ Vũ Trụ",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đỉnh Núi Linh Thiêng Targon",
    image: "/assets/bard.webp",
    meaning: "Thực thể thần bí vượt qua các chiều không gian, chỉ xuất hiện khi sự cân bằng của vũ trụ bị đe dọa bởi những cổ vật quyền năng. Thu thập những chiếc chuông ngân vang, mở ra Cổng Không Gian huyền ảo và giáng Lệnh Định Mệnh (Tempered Fate) đóng băng thời gian của mọi sinh linh trong vùng ảnh hưởng.",
    rarity: "Huyền Thoại Vô Thượng",
    element: "Hành Trình Kỷ Diệu · Tĩnh Mịch Thời Không Định Mệnh"
  },
  {
    name: "Brand",
    title: "Ngọn Đuốc Sống - Thần Hỏa Tận Thế",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/brand.webp",
    meaning: "Sinh vật sinh ra từ ngọn lửa cổ ngữ cổ xưa xâm chiếm thể xác của gã thợ săn Kegan Rodhe tại Freljord băng giá. Mang trong mình khát khao thiêu rụi toàn cõi Runeterra thành tro tàn, phóng ra Cột Lửa ngùn ngụt và phát động Bão Lửa (Pyroclasm) nảy liên tục thiêu cháy toàn bộ đội hình kẻ thù.",
    rarity: "Chí Tôn Tà Hỏa",
    element: "Ngọn Lửa Bỏng Cháy · Bão Lửa Tận Thế"
  },
  {
    name: "Braum",
    title: "Trái Tim Của Freljord - Chiếc Khiên Thần Bí",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/braum.webp",
    meaning: "Người hùng vĩ đại mang nụ cười ấm áp và lòng tốt vô biên của Freljord, vác trên lưng cánh cửa kho báu cổ xưa Ornn rèn đúc làm khiên chắn. Dùng thân mình bảo hộ muôn người trước bão tuyết và mũi tên kẻ địch, dậm mạnh Băng Địa Chấn làm nứt toác mặt đất hất tung đối phương.",
    rarity: "Huyền Thoại Anh Hùng",
    element: "Băng Tuyết Hộ Thể · Khiên Băng Chắn Sóng Tối Thượng"
  },
  {
    name: "Cho'Gath",
    title: "Quái Vật Hư Không - Kẻ Nuốt Chửng Thế Giới",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Hư Không (The Void)",
    image: "/assets/cho_gath.webp",
    meaning: "Quái vật hung tợn khổng lồ trỗi dậy từ vết nứt sâu thẳm của Hư Không, sở hữu lớp giáp gai góc sắc nhọn và cơn đói vĩnh hằng. Mỗi sinh mạng bị hắn Ăn Tươi Nuốt Sống (Feast) đều nuôi dưỡng cơ thể hắn ngày càng to lớn vượt bậc, dậm gót gây Rạn Nứt và phát ra tiếng thét câm lặng chấn động càn khôn.",
    rarity: "Chí Tôn Dị Thú",
    element: "Hư Không Hóa Thân · Rạn Nứt Ăn Tươi Nuốt Sống"
  },
  {
    name: "Janna",
    title: "Cơn Thịnh Nộ Của Bão Tố - Tinh Linh Gió Zaun",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/janna.webp",
    meaning: "Tinh linh gió cổ xưa che chở cho những người cùng khổ dưới đáy sâu hầm mỏ và làn khói độc của Zaun. Thổi tan khói u ám bằng ngọn gió lành, tạo nên Lốc Xoáy hất tung kẻ ác và mở rộng Mắt Bão hồi phục sinh lực bảo bọc toàn vẹn cho những ai khẩn cầu.",
    rarity: "Chí Tôn Tinh Linh",
    element: "Gió Lốc Bảo Hộ · Mắt Bão Chữa Lành"
  },
  {
    name: "Jarvan IV",
    title: "Biểu Tượng Của Demacia - Hoàng Tử Kiên Cường",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/jarvan.webp",
    meaning: "Vị vua trẻ kiên định của Demacia, lãnh đạo quân đoàn tinh nhuệ bằng tấm gương dũng cảm và thanh long kích sắc bén. Phóng Hoàng Kỳ Demacia rồi lao tới hất tung đối thủ, trước khi nhảy vọt lên không trung tung đòn Đại Địa Chấn (Cataclysm) giam hãm kẻ thù trong võ đài đá bất khả đào thoát.",
    rarity: "Chí Tôn Quân Vương",
    element: "Long Kích Quân Kì · Đại Địa Chấn Khép Góc"
  },
  {
    name: "Jayce",
    title: "Người Bảo Hộ Mai Sau - Búa Thủy Ngân Hextech",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/jayce.webp",
    meaning: "Nhà phát minh thiên tài kiêu hãnh của Piltover, người luôn đặt sự an nguy của thành phố tiến bộ lên hàng đầu. Sử dụng Búa Thủy Ngân Hextech có thể linh hoạt chuyển đổi giữa cận chiến sấm sét và đại pháo tầm xa, dựng Cổng Gia Tốc phóng Cầu Sấm với tầm bắn và uy lực hủy diệt phi thường.",
    rarity: "Huyền Thoại Hextech",
    element: "Búa Thủy Ngân Chuyển Dạng · Cổng Gia Tốc Cầu Sấm"
  },
  {
    name: "Jhin",
    title: "Nghệ Sĩ Tử Thần - Vũ Điệu Bốn Nốt Súng",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Đất Đầu Tiên Ionia",
    image: "/assets/jhin.webp",
    meaning: "Kẻ sát nhân điên loạn đầy tinh tế của Ionia, coi cái chết là một tác phẩm nghệ thuật tráng lệ được sắp đặt công phu. Khẩu súng 'Thì Thầm' chỉ chứa đúng 4 viên đạn với viên thứ tư chí mạng tuyệt đối, mở rộng Sân Khấu Tử Thần (Curtain Call) tỉa từng phát súng đoạt mệnh từ khoảng cách không tưởng.",
    rarity: "Chí Tôn Nghệ Sĩ",
    element: "Khẩu Súng Thì Thầm · Sân Khấu Tử Thần Hoàn Hảo"
  },
  {
    name: "Jinx",
    title: "Khẩu Pháo Nổi Loạn - Đại Bác Xương Xẩu Zaun",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/jinx.webp",
    meaning: "Nữ tội phạm điên loạn khét tiếng nhất Zaun, đam mê phá hủy và sự hỗn loạn không hồi kết với kho vũ khí tự chế quái đản. Luân chuyển giữa súng nhỏ Bang Bang và khẩu phóng lựu Xương Xẩu, phóng Tên Lửa Đạn Đạo Siêu Khủng Khiếp bay xuyên bản đồ nổ tung theo lượng máu mất của nạn nhân.",
    rarity: "Chí Tôn Xạ Thủ",
    element: "Bắn Xương Xẩu Bùng Nổ · Tên Lửa Siêu Khủng Khiếp"
  },
  {
    name: "K'Sante",
    title: "Niềm Kiêu Hãnh Nazumah - Đao Cự Thú Ntofo",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/k_sante.webp",
    meaning: "Thợ săn quái thú vĩ đại bảo vệ ốc đảo Nazumah kiên cường giữa sa mạc Shurima, sử dụng cặp vũ khí Ntofo chế tác từ da cự thú cứng cáp. Bền bỉ che chắn cho đồng đội rồi kích hoạt Khô Máu (All Out), đập vỡ lớp giáp phòng thủ để biến vũ khí thành song kiếm sắc lẹm xé toạc mọi chướng ngại.",
    rarity: "Chí Tôn Chiến Tướng",
    element: "Song Đao Ntofo Bất Khuất · Khô Máu Phá Tường"
  },
  {
    name: "Kai'Sa",
    title: "Ái Nữ Hư Không - Lớp Giáp Sống Cộng Sinh",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Hư Không (The Void)",
    image: "/assets/kai_sa.webp",
    meaning: "Con gái của Kassadin bị rơi xuống hang sâu Hư Không từ thuở ấu thơ, sống sót nhờ hợp nhất với một sinh vật ký sinh thành lớp giáp sống thứ hai. Phóng ra Cơn Mưa Icathia và Tia Truy Lĩnh bắn phá mục tiêu, phi thân thần tốc bằng Bản Năng Sát Thủ (Killer Instinct) nhận lá chắn khổng lồ giữa vòng vây kẻ địch.",
    rarity: "Chí Tôn Thợ Săn",
    element: "Bào Tử Hư Không · Bản Năng Sát Thủ"
  },
  {
    name: "Kalista",
    title: "Mũi Giáo Phục Hận - Hồn Ma Khế Ước Báo Thù",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Quần Đảo Bóng Đêm",
    image: "/assets/kalista.webp",
    meaning: "Vị tướng Camavor cổ xưa bị phản bội và sát hại dã man, biến thành linh hồn báo thù gieo rắc nỗi kinh hoàng trên Quần Đảo Bóng Đêm. Kết nối linh hồn với đồng minh, găm vô số mũi giáo linh hồn vào da thịt đối phương rồi giật mạnh Giày Vò (Rend) kết liễu kẻ phản bội trong đau đớn.",
    rarity: "Huyền Thoại Báo Thù",
    element: "Mũi Giáo Hồn Ma · Giày Vò Xuyên Thấu"
  },
  {
    name: "Karthus",
    title: "Tiếng Ru Tử Thần - Khúc Cầu Hồn Toàn Cõi",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Quần Đảo Bóng Đêm",
    image: "/assets/karthus.webp",
    meaning: "Pháp sư tôn sùng cái chết và sự giải thoát của linh hồn, tìm đến Màn Sương Đen để trở thành linh mục tối cao của cõi vĩnh hằng. Dù thân xác tan biến vẫn có thể niệm phép từ cõi chết, ngân lên giai điệu Khúc Cầu Hồn (Requiem) trút sấm sét ma quái xuống đầu toàn bộ tướng địch trên khắp cõi Runeterra.",
    rarity: "Chí Tôn Tử Thần",
    element: "Tàn Phá Hư Ảo · Khúc Cầu Hồn Requiem"
  },
  {
    name: "Katarina",
    title: "Ác Hồng Đỏ - Song Dao Bông Sen Tử Thần",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/katarina.webp",
    meaning: "Đại tiểu thư gia tộc Du Couteau danh giá của Noxus, bậc thầy dùng dao găm với tốc độ ám sát đáng sợ bậc nhất. Thu nhặt những lưỡi dao rơi trên chiến trường để tái lập thế tấn công chớp nhoáng, xoay người thi triển Bông Sen Tử Thần (Death Lotus) phóng hàng trăm lưỡi dao đoạt mạng toàn bộ kẻ địch.",
    rarity: "Chí Tôn Sát Thủ",
    element: "Phi Dao Ám Sát · Bông Sen Tử Thần Chớp Nhoáng"
  },
  {
    name: "Kindred",
    title: "Thợ Săn Vĩnh Hằng - Cừu & Sói Âm Dương",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Liên Minh Huyền Thoại",
    image: "/assets/kindred.webp",
    meaning: "Hiện thân kép của cái chết trong truyền thuyết Runeterra: Cừu mang đến sự ra đi êm ái cho những ai chấp nhận số phận, còn Sói đuổi theo cắn xé những kẻ cố tình trốn chạy. Đặt Dấu Ấn Thần Chết săn lùng đối thủ và dựng Cừu Cứu Sinh (Lamb's Respite) ngăn chặn mọi sự hủy diệt trong gang tấc.",
    rarity: "Chí Tôn Thần Chết",
    element: "Cung Tên Cừu Ngoan · Sói Điên Cắn Xé · Cừu Cứu Sinh"
  },
  {
    name: "Kled",
    title: "Kị Sĩ Cáu Kỉnh - Thằn Lằn Skaarl Bất Tử",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/kled.webp",
    meaning: "Chiến binh Yordle cuồng chiến và hoang tưởng nhất của Noxus, tuyên bố quyền sở hữu mọi tấc đất hắn đặt chân đến cùng con thằn lằn hèn nhát Skaarl. Không biết sợ hãi là gì, khi Skaarl bỏ chạy hắn càng chiến đấu điên cuồng hơn để gọi thú cưỡi trở lại, hò reo Xung Phongggg lao vào lòng quân địch với tốc độ chóng mặt.",
    rarity: "Huyền Thoại Hiếu Chiến",
    element: "Kị Sĩ Skaarl · Xung Phong Càn Quét Không Lùi"
  },
  {
    name: "Kog'Maw",
    title: "Miệng Nuốt Hư Không - Axit Hủy Diệt Tận Cùng",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Hư Không (The Void)",
    image: "/assets/kog_maw.webp",
    meaning: "Ấu trùng quái dị bò ra từ Hư Không với bản tính tò mò kỳ lạ: nếm thử mọi thứ bằng cách phun dịch axit ăn mòn cực mạnh. Bắn ra Cao Xạ Ma Pháp với tốc độ điên cuồng thiêu rụi mục tiêu, phóng Pháo Sinh Học tầm cực xa từ trên trời rơi xuống và tự kích nổ thi thể khi chết để kéo kẻ địch theo cùng.",
    rarity: "Bá Chủ Hư Không",
    element: "Nước Bọt Axit · Pháo Sinh Học Tầm Xa"
  },
  {
    name: "Lissandra",
    title: "Mụ Phù Thủy Băng - Băng Đen Cổ Xưa Khắc Nghiệt",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/lissandra.webp",
    meaning: "Nữ thủ lĩnh mù lòa đầy quyền lực của Tộc Thủ Vệ Băng Giá, kẻ đã phong ấn các Ác Thần Hư Không sâu dưới lớp Băng Chân Cổ Đại hàng ngàn năm trước. Biến kẻ địch ngã xuống thành các Nô Lệ Băng nổ tung sát thương, dịch chuyển bằng Con Đường Băng Giá và tự đóng băng mình hoặc kẻ địch trong Hầm Mộ Băng Giá (Frozen Tomb).",
    rarity: "Chí Tôn Ma Thần",
    element: "Băng Đen Cổ Ngữ · Hầm Mộ Băng Giá Tối Cường"
  },
  {
    name: "Locke",
    title: "Thầy Trừ Tà Tro Tàn - Cọc Bạc & Ngục Luyện Tội",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/locke.webp",
    meaning: "Truyền nhân của những kẻ huyền bí Demacia nhận ra bóng tối thực sự nằm trong tâm can con người, hành tẩu khắp Runeterra như một thầy trừ tà mang cọc bạc thánh hóa. Đánh dấu kẻ thù bằng Đinh Nghi Thức, bùng nổ linh hồn đốt cháy sinh mệnh và giam cầm linh hồn tội lỗi trong kết giới Ngục Luyện Tội (Purgatory) vĩnh hằng.",
    rarity: "Chí Tôn Trừ Tà",
    element: "Cọc Bạc Tẩy Trần · Ngục Luyện Tội Purgatory"
  },
  {
    name: "Lucian",
    title: "Kẻ Thanh Trừng - Xạ Thủ Ánh Sáng Cứu Rỗi",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/lucian.webp",
    meaning: "Thành viên kiên cường của Vệ Binh Ánh Sáng, mang trên mình khẩu súng của chính mình và khẩu súng của người vợ Senna để diệt trừ ma quỷ hắc ám. Lướt đi linh hoạt với Tia Sáng Rực Cháy, kích hoạt Xạ Thủ Ánh Sáng bắn đúp đạn thần tốc và trút cơn thịnh nộ Thanh Trừng (The Culling) quét sạch quân thù.",
    rarity: "Huyền Thoại Vệ Binh",
    element: "Song Súng Cổ Vật · Thanh Trừng Bão Đạn Ánh Sáng"
  },
  {
    name: "Lulu",
    title: "Phù Thủy Tinh Linh - Tiên Pix Biến Hóa Kỳ Ảo",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Bandle",
    image: "/assets/lulu.webp",
    meaning: "Phù thủy Yordle mơ mộng kết bạn cùng tiên Pix tinh nghịch trong Rừng Mộng Du kỳ ảo. Mang đến những phép biến hóa màu nhiệm: biến kẻ địch hung hãn thành chú sóc nhỏ đáng yêu, bọc lá chắn lấp lánh và hô vang Khổng Lồ Hóa (Wild Growth) biến đồng minh thành người khổng lồ hất tung cả vùng đất.",
    rarity: "Chí Tôn Tinh Linh",
    element: "Bụi Phép Thần Tiên · Khổng Lồ Hóa Hoang Dã"
  },
  {
    name: "Lux",
    title: "Tiểu Thư Ánh Sáng - Cầu Vồng Tối Thượng",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/lux.webp",
    meaning: "Tiểu thư gia tộc Crownguard cao quý của Demacia, bẩm sinh sở hữu ma thuật ánh sáng rực rỡ vượt qua sự cấm đoán ngặt nghèo của vương quốc. Tạo Quả Cầu Sáng trói chân đối thủ, dựng Khiên Lăng Kính bảo bọc bạn bè và giải phóng chùm tia sáng Cầu Vồng Tối Thượng (Final Spark) thiêu đốt mọi bóng tối trong chớp mắt.",
    rarity: "Chí Tôn Ánh Sáng",
    element: "Quang Năng Ma Pháp · Cầu Vồng Tối Thượng Final Spark"
  },
  {
    name: "Malphite",
    title: "Mảnh Vỡ Thiên Thạch - Cú Đâm Không Thể Ngăn Cản",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Rừng Già Ixtal & Hoang Dã",
    image: "/assets/malphite.webp",
    meaning: "Một sinh vật khổng lồ được sinh ra từ pháo đài bay Ixtal cổ xưa Monolith, mang sứ mệnh mang lại trật tự và sự vững chãi cho mặt đất. Sở hữu lớp giáp đá hấp thụ sát thương cực đại, lăn Mảnh Vỡ Địa Chấn làm chậm và phát động Cú Đâm Không Thể Ngăn Cản (Unstoppable Force) nghiền nát tan tành đội hình địch.",
    rarity: "Chí Tôn Thạch Thần",
    element: "Nham Thạch Thần Giáp · Không Thể Cản Phá"
  },
  {
    name: "Malzahar",
    title: "Tiên Tri Hư Không - Bầy Bọ Địa Ngục Bất Tận",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Hư Không (The Void)",
    image: "/assets/malzahar.webp",
    meaning: "Nhà tiên tri Shurima bị tiếng gọi của Hư Không cám dỗ, trở thành sứ giả mở đường cho các thực thể cổ đại xâm lấn thế giới Runeterra. Thả Bầy Bọ Hư Không cắn xé mục tiêu mang Ám Ảnh Kinh Hoàng, triệu hồi Tiếng Gọi Hư Không câm lặng và trói chặt kẻ địch bằng Âm Ti Trói Buộc (Nether Grasp) không lối thoát.",
    rarity: "Chí Tôn Tà Thuật",
    element: "Lời Ám Ảnh Hư Không · Âm Ti Trói Buộc"
  },
  {
    name: "Mel",
    title: "Nghị Viên Gia Tộc Medarda - Trí Tuệ & Quyền Lực",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/mel.webp",
    meaning: "Nghị viên quyền lực và sắc sảo nhất Hội Đồng Piltover xuất thân từ dòng dõi quý tộc chiến binh lẫy lừng Medarda xứ Noxus. Nắm giữ nghệ thuật ngoại giao tài tình, thúc đẩy công nghệ Hextech vươn tầm thời đại và sở hữu sức mạnh hộ thể hoàng kim bí ẩn bảo hộ ánh sáng trước bờ vực chiến tranh.",
    rarity: "Chí Tôn Quý Tộc",
    element: "Trí Tuệ Chiến Lược · Ma Năng Hoàng Kim Bảo Hộ"
  },
  {
    name: "Milio",
    title: "Ngọn Lửa Dịu Êm - Hỏa Tinh Chữa Lành Axolotl",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Rừng Già Ixtal & Hoang Dã",
    image: "/assets/milio.webp",
    meaning: "Cậu bé tài năng xứ Ixtal đã tự mình khám phá ra tiên đề Axiom ngọn lửa ấm áp chữa lành thay vì thiêu hủy. Cùng những người bạn ngọn lửa tinh linh 'fuemigo' nhỏ bé đáng yêu trong chiếc ba lô, Milio đá quả cầu lửa đẩy lùi nguy hiểm và phát động Hơi Thở Sự Sống (Breath of Life) thanh tẩy mọi trạng thái khống chế cho đồng đội.",
    rarity: "Huyền Thoại Nguyên Tố",
    element: "Ngọn Lửa Sưởi Ấm · Hơi Thở Sự Sống Xua Tan Tật Bệnh"
  },
  {
    name: "Miss Fortune",
    title: "Thợ Săn Tiền Thưởng - Bão Đạn Song Khẩu Bilgewater",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Biển Bilgewater",
    image: "/assets/miss_fortune.webp",
    meaning: "Thuyền trưởng xinh đẹp và tàn nhẫn thống trị vịnh Bilgewater, người đã lật đổ đế chế bạo tàn của Gangplank để trả thù cho mẹ. Dẫn đầu hạm đội với tốc độ Sải Bước tự tin, bắn Bắn Một Được Hai nảy đạn bất ngờ và xả Bão Đạn (Bullet Time) hình nón quét sạch mọi sinh mạng trên mặt boong tàu.",
    rarity: "Chí Tôn Nữ Vương Biển",
    element: "Song Súng Sốc & Nhát Gan · Bão Đạn Bullet Time"
  },
  {
    name: "Mordekaiser",
    title: "Thiết Hắc Ám Quân - Lãnh Địa Tử Thần Bất Diệt",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/mordekaiser.webp",
    meaning: "Bạo chúa tàn bạo cổ đại đã hai lần hồi sinh từ cõi chết, dùng linh hồn kẻ thù đúc nên pháo đài bất diệt và bộ giáp sắt đen khổng lồ. Vung Chùy Đêm Tối đập nát kẻ ngáng đường và kéo mục tiêu vào Vương Quốc Tử Vong (Realm of Death), nơi hắn tước đoạt chỉ số và bắt đối thủ phải quyết đấu sinh tử một mất một còn.",
    rarity: "Chí Tôn Minh Vương",
    element: "Chùy Đêm Tối Dạ Khởi · Vương Quốc Tử Vong Vương Giả"
  },
  {
    name: "Morgana",
    title: "Kẻ Bị Đày Đọa - Trói Hồn Hắc Ám Demacia",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/morgana.webp",
    meaning: "Thượng Nhân Công Lý có đôi cánh bóng đêm bị trói chặt, chọn đồng cảm với nỗi đau của phàm nhân thay vì phán xét lạnh lùng như người chị Kayle. Phóng Khóa Bóng Đêm giam giữ mục tiêu trong thời gian dài, trải Vũng Máu Đen thiêu đốt linh hồn và giải phóng Trói Hồn (Soul Shackles) trừng phạt những kẻ gây tội ác.",
    rarity: "Chí Tôn Thần Nữ",
    element: "Xiềng Xích Hắc Ám · Khóa Bóng Đêm Tận Cùng"
  },
  {
    name: "Naafiri",
    title: "Chó Săn Darkin - Bầy Đàn Săn Mồi Shurima",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/naafiri.webp",
    meaning: "Vũ khí sống Darkin cổ đại thức tỉnh trong sa mạc Shurima, nhưng thay vì nhập vào một thể xác duy nhất, linh hồn nàng đã hòa nhập vào toàn bộ đàn chó săn cồn cát hung hãn. Triệu tập bầy linh cẩu lao tới cắn xé con mồi, phóng Dao Găm Darkin rỉ máu và phát động Tiếng Hú Của Bầy (The Call of the Pack) tăng cường sức mạnh hủy diệt.",
    rarity: "Thần Thoại Darkin",
    element: "Dao Găm Darkin · Bầy Đàn Xé Xác Bất Tận"
  },
  {
    name: "Nami",
    title: "Nàng Tiên Cá Thủy Tộc Marai - Đại Hồng Thủy Triều Biển",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đỉnh Núi Linh Thiêng Targon",
    image: "/assets/nami.webp",
    meaning: "Chiến binh tiên phong của bộ tộc người cá Marai dưới đáy biển sâu, dấn thân lên bờ tìm kiếm Thượng Nhân Targon để đổi lấy Viên Đá Mặt Trời cứu sống đồng tộc. Sử dụng gậy ngọc điều khiển sóng nước, bẫy kẻ thù vào Thủy Lao bọt nước và triệu hồi con sóng Đại Hồng Thủy (Tidal Wave) cuộn trào hất tung diện rộng.",
    rarity: "Chí Tôn Thần Nữ",
    element: "Thủy Lao Trói Buộc · Đại Hồng Thủy Triều Dâng"
  },
  {
    name: "Nasus",
    title: "Nhà Thông Thái Sa Mạc - Quyền Trượng Thể Thần",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/nasus.webp",
    meaning: "Chiến tướng Thăng Hoa mang hình dạng Thần Chó Jackal, người bảo hộ tri thức và thư viện vĩ đại của Shurima qua hàng ngàn năm. Tích lũy sức mạnh vô hạn qua mỗi cú Quyền Trượng Linh Hồn (Siphoning Strike), làm Lão Hóa bước chân kẻ địch và kích hoạt Cơn Thịnh Nộ Sa Mạc hóa thành vị thần khổng lồ quét sạch quân thù.",
    rarity: "Chí Tôn Thể Thần",
    element: "Quyền Trượng Quyền Năng · Cơn Thịnh Nộ Sa Mạc Hóa Thần"
  },
  {
    name: "Nautilus",
    title: "Khổng Lồ Đáy Biển - Mỏ Neo Đen Chìm Tàu",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Biển Bilgewater",
    image: "/assets/nautilus.webp",
    meaning: "Người thủy thủ bị phản bội và bỏ rơi dưới đáy biển đen sâu thẳm của Bilgewater, tái sinh trong bộ đồ lặn sắt nặng nề chứa đầy oán hận. Vung mỏ neo khổng lồ kéo kẻ thù lại gần, dậm sấm chấn động mặt đất và phóng Thủy Lôi Tầm Nhiệt (Depth Charge) đuổi theo hất tung kẻ địch lên trời cao.",
    rarity: "Chí Tôn Quái Thú Biển",
    element: "Mỏ Neo Khổng Lồ · Thủy Lôi Tầm Nhiệt Bất Khả Kháng"
  },
  {
    name: "Neeko",
    title: "Hóa Hình Sặc Sỡ - Tinh Linh Tộc Oovi-Kat",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Rừng Già Ixtal & Hoang Dã",
    image: "/assets/neeko.webp",
    meaning: "Thành viên cuối cùng của tộc người Vastaya cổ xưa Oovi-Kat, sở hữu khả năng hòa nhập và bắt chước hình dạng của bất kỳ sinh vật nào thông qua linh hồn Sho'ma. Tạo phân thân đánh lừa kẻ thù, ném Pháo Hạt nảy ba lần và nhảy múa tung đòn Nổ Hoa (Pop Blossom) làm choáng toàn bộ quân địch xung quanh.",
    rarity: "Huyền Thoại Biến Ảo",
    element: "Sho'ma Hòa Hợp · Nổ Hoa Tinh Linh Rực Rỡ"
  },
  {
    name: "Nilah",
    title: "Hiện Thân Vui Vẻ - Roi Nước Quỷ Ashlesh",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Biển Bilgewater",
    image: "/assets/nilah.webp",
    meaning: "Nữ chiến binh huyền thoại đến từ lục địa Kathkan xa xôi, người đã đánh đổi toàn bộ cảm xúc của mình cho con quỷ vui vẻ bảy cánh Ashlesh để đổi lấy sức mạnh thần thánh. Vung ngọn roi nước phát sáng chém xuyên giáp, né tránh đòn đánh bằng Thủy Mạc Thần Tốc và tạo Vòng Xoáy Vui Vẻ hút trọn kẻ thù vào tâm chấn.",
    rarity: "Chí Tôn Diệt Thú",
    element: "Roi Nước Linh Hồn Ashlesh · Vũ Điệu Vui Vẻ Lốc Xoáy"
  },
  {
    name: "Nocturne",
    title: "Ác Mộng Vĩnh Cửu - Màn Đêm Bao Phủ Runeterra",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Liên Minh Huyền Thoại",
    image: "/assets/nocturne.webp",
    meaning: "Thực thể ma quái được sinh ra từ những cơn ác mộng kinh hoàng nhất trong Chiến Tranh Cổ Ngữ, săn lùng những linh hồn đang say ngủ. Tạo vệt Hoàng Hôn tăng tốc độ săn mồi, gieo rắc Nỗi Kinh Hoàng câm lặng và kích hoạt Hoang Tưởng (Paranoia) tắt phụt tầm nhìn toàn bản đồ rồi lao vút tới đoạt mạng nạn nhân.",
    rarity: "Chí Tôn Tà Linh",
    element: "Hoàng Hôn Ám Ảnh · Hoang Tưởng Paranoia Tối Tăm"
  },
  {
    name: "Olaf",
    title: "Chiến Binh Điên Cuồng - Rìu Nộ Tận Cùng Băng Giá",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/olaf.webp",
    meaning: "Chiến binh Freljord kiêu hùng bị ám ảnh bởi lời tiên tri rằng mình sẽ chết một cách thanh bình trên giường bệnh, nên luôn điên cuồng lao vào những trận chiến hiểm nghèo nhất để tìm kiếm cái chết vinh quang. Càng mất máu đánh càng nhanh, vung Bổ Chú Chân Thực và kích hoạt Tận Thế Ragnarok miễn nhiễm mọi hiệu ứng khống chế.",
    rarity: "Huyền Thoại Cuồng Nộ",
    element: "Rìu Máu Băng Giá · Tận Thế Ragnarok Miễn Nhiễm"
  },
  {
    name: "Orianna",
    title: "Quý Cô Dây Cót - Quả Cầu Xung Lực Hextech",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/orianna.webp",
    meaning: "Cô gái trẻ Piltover từng hy sinh cơ thể vì cứu nạn nhân trong hầm mỏ ô nhiễm, được cha chế tác lại toàn bộ cơ thể bằng bộ máy đồng hồ dây cót tinh xảo. Điều khiển Quả Cầu Hextech hỗ trợ phòng ngự và tung ra Lệnh: Sóng Âm (Command: Shockwave) tạo ra lực hút vặn xoắn không gian lật ngược thế cờ.",
    rarity: "Chí Tôn Cơ Giới",
    element: "Quả Cầu Hextech · Lệnh Sóng Âm Shockwave Vặn Xoắn"
  },
  {
    name: "Pantheon",
    title: "Mũi Giáo Bất Diệt - Chiến Thần Phàm Nhân Atreus",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đỉnh Núi Linh Thiêng Targon",
    image: "/assets/pantheon.webp",
    meaning: "Phàm nhân Atreus từng bị Thượng Nhân Chiến Tranh Targon chiếm đoạt thể xác, nhưng khi vị thần ngã xuống dưới tay Aatrox, ý chí bất khuất của con người trong anh đã thắp sáng lại chòm sao Pantheon. Vung Khiên Chắn Bất Diệt che chở mọi đòn đánh và bay vút lên không trung giáng Trời Sập (Grand Starfall) nghiền nát quân thù.",
    rarity: "Chí Tôn Chiến Thần",
    element: "Ngọn Giáo Sao Rơi · Trời Sập Grand Starfall"
  },
  {
    name: "Poppy",
    title: "Người Giữ Búa Demacia - Sứ Mệnh Anh Hùng Bất Diệt",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/poppy.webp",
    meaning: "Chiến binh Yordle nhỏ bé mang trong mình lòng trung thành son sắt với người anh hùng lập quốc Demacia Orlon, nhận sứ mệnh trao chiếc búa thần cho người xứng đáng mà không nhận ra chính nàng là anh hùng. Dùng Sứ Giả Phán Quyết hất văng cả đội hình địch về tế đàn và dựng Không Thể Lay Chuyển chặn đứng mọi pha lướt tới.",
    rarity: "Huyền Thoại Kiên Cường",
    element: "Búa Tạ Orlon · Sứ Giả Phán Quyết Bay Xa"
  },
  {
    name: "Pyke",
    title: "Sát Thủ Vùng Nước Đỏ - Lưỡi Dao Tử Thần Bilgewater",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Biển Bilgewater",
    image: "/assets/pyke.webp",
    meaning: "Thợ săn cá voi kiêu dũng bị đồng đội bỏ mặc cho chết trong bụng quái thú biển khơi Jaull, nay trở lại từ cõi chết với một danh sách báo thù không bao giờ cạn dưới đáy vịnh Bilgewater. Lặn dưới nước sâu ngụy trang tiếp cận, phóng lao kéo mục tiêu và trảm đòn Tử Thần Đáy Sâu hình chữ X kết liễu chia tiền cho đồng minh.",
    rarity: "Chí Tôn Sát Thủ",
    element: "Lưỡi Dao Xương Thú · Tử Thần Đáy Sâu Death From Below"
  },
  {
    name: "Qiyana",
    title: "Nữ Hoàng Nguyên Tố - Vòng Đao Ohmlatl Ixtal",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Rừng Già Ixtal & Hoang Dã",
    image: "/assets/qiyana.webp",
    meaning: "Vương nữ út đầy tham vọng và thiên tài pháp thuật của vương triều khép kín Ixaocan xứ Ixtal, sử dụng vũ khí vòng đao Ohmlatl điều khiển ba nguyên tảng: Đất, Sông và Rừng rậm. Thu thập nguyên tố biến đổi chiêu thức và kích hoạt Thế Giới Bùng Nổ (Supreme Display of Talent) đẩy lùi đối phương đập vào tường tạo nên vụ nổ kinh hoàng.",
    rarity: "Chí Tôn Vương Nữ",
    element: "Nguyên Tố Sông Rừng Đất · Thế Giới Bùng Nổ Sóng Xung Kích"
  },
  {
    name: "Quinn",
    title: "Đôi Cánh Demacia - Chim Ưng Valor Trinh Sát",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/quinn.webp",
    meaning: "Hiệp sĩ trinh sát tài ba của biên giới Demacia cùng người bạn đồng hành chí cốt - chú chim ưng thần bí xanh Valor. Tấn công chuẩn xác vào Tiêu Điểm kẻ thù, phóng chim ưng Valor làm mù tầm nhìn và cất cánh Đi Xa Oanh Tạc với tốc độ phi mã tiếp ứng khắp chiến trường.",
    rarity: "Huyền Thoại Trinh Sát",
    element: "Nỏ Cầm Tay Sắc Lẹm · Oanh Tạc Thần Tốc Valor"
  },
  {
    name: "Rell",
    title: "Chiến Binh Kim Loại - Thiết Mã Nổi Loạn Noxus",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/rell.webp",
    meaning: "Nạn nhân thí nghiệm tàn bạo của Hội Hoa Hồng Đen nhằm tạo ra thứ vũ khí sống chống lại Mordekaiser, sở hữu khả năng thao túng kim thuật sắt thép tuyệt đối. Biến bộ giáp sắt thành chiến mã phi nước đại rồi đập xuống biến thành bộ giáp nặng nề, phóng Từ Trường Vạn Vật hút chặt toàn bộ kẻ thù xung quanh.",
    rarity: "Huyền Thoại Kim Thuật",
    element: "Kim Loại Nung Chảy · Hút Nam Châm Bão Từ Trường"
  },
  {
    name: "Renata Glasc",
    title: "Bà Trùm Hóa Kỹ - Khí Độc Thao Túng Tâm Trí",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/renata.webp",
    meaning: "Bà trùm kinh doanh lọc lõi và tàn nhẫn nhất thành phố Zaun, xây dựng đế chế tập đoàn hóa kỹ khổng lồ Glasc Industries từ đống tro tàn của gia đình. Ban phát Cứu Cánh hồi sinh đồng đội trong tích tắc và giải phóng làn sóng Hợp Thức Hóa Hỗn Loạn (Hostile Takeover) khiến kẻ thù quay sang tàn sát lẫn nhau.",
    rarity: "Chí Tôn Tài Phiệt",
    element: "Khí Độc Hóa Kỹ · Hợp Thức Hóa Hỗn Loạn Cuồng Loạn"
  },
  {
    name: "Renekton",
    title: "Đồ Tể Sa Mạc - Lưỡi Đao Trăng Khuyết Cuồng Nộ",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/renekton.webp",
    meaning: "Tướng quân Thăng Hoa mang hình hài cá sấu dũng mãnh nhất của Shurima cổ đại, bị nhốt cùng Xerath hàng thế kỷ trong lăng mộ khiến tâm trí rơi vào cơn điên loạn tột cùng. Chém xoay Lưỡi Hái Cuồng Nộ hồi máu, Kẻ Săn Mồi Tàn Nhẫn làm choáng và hóa Thần Dominus bùng nổ bão cát thiêu rụi kẻ thù.",
    rarity: "Chí Tôn Thể Thần",
    element: "Cuồng Nộ Thần Cá Sấu · Thần Cá Sấu Dominus Cuồng Loạn"
  },
  {
    name: "Rengar",
    title: "Thú Săn Mồi Kiêu Hãnh - Vòng Tay Răng Nanh",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Rừng Già Ixtal & Hoang Dã",
    image: "/assets/rengar.webp",
    meaning: "Thợ săn Vastaya Kiilash kiêu hãnh của rừng rậm hoang dã, cả đời tìm kiếm những con mồi nguy hiểm nhất để khẳng định bản lĩnh tột đỉnh. Ẩn mình trong bụi cỏ nhảy vồ lấy mục tiêu, tích điểm Hung Tợn tung đòn Tàn Bạo và kích hoạt Khao Khát Săn Mồi ngụy trang phát hiện kẻ địch đơn độc đoạt mạng chớp mắt.",
    rarity: "Chí Tôn Thợ Săn",
    element: "Vũ Điệu Răng Nanh · Khao Khát Săn Mồi Tàng Hình Vồ Mồi"
  },
  {
    name: "Rumble",
    title: "Hiểm Họa Cơ Giới - Trunty Thảm Lửa Rực Cháy",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Bandle",
    image: "/assets/rumble.webp",
    meaning: "Nhà sáng chế Yordle nóng nảy và đầy lòng tự hào dân tộc, tự tay lắp ráp cỗ người máy chiến đấu khổng lồ Trunty từ những đống sắt vụn bị ruồng bỏ. Đốt cháy kẻ thù bằng Súng Phun Lửa, bắn Lao Điện làm chậm và rải Thảm Lửa Mưa Tên Lửa (The Equalizer) chia cắt hoàn toàn đội hình quân địch.",
    rarity: "Huyền Thoại Yordle",
    element: "Súng Phun Lửa · Thảm Lửa Mưa Tên Lửa The Equalizer"
  },
  {
    name: "Ryze",
    title: "Pháp Sư Cổ Ngữ - Cuộn Giấy Thế Giới Vòng Xoáy Không Gian",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Liên Minh Huyền Thoại",
    image: "/assets/ryze.webp",
    meaning: "Đại pháp sư cổ xưa mang trên lưng gánh nặng bảo vệ thế giới Runeterra khỏi sự hủy diệt bằng việc thu thập và phong ấn các Cổ Ngữ Thế Giới quyền năng. Xả combo Quá Tải và Dòng Chảy Cổ Ngữ liên hoàn, mở Cổng Vòng Xoáy Không Gian (Realm Warp) dịch chuyển toàn bộ đồng minh xuyên qua địa hình chiến trường.",
    rarity: "Chí Tôn Đại Pháp Sư",
    element: "Cổ Ngữ Thế Giới · Vòng Xoáy Không Gian Dịch Chuyển"
  },
  {
    name: "Samira",
    title: "Hoa Hồng Sa Mạc - Lốc Xoáy Kiếm Súng Phong Cách S",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/samira.webp",
    meaning: "Lính đánh thuê liều lĩnh gốc Shurima phục vụ cho Noxus, luôn tìm kiếm cảm giác hưng phấn tột độ trong những tình huống thập tử nhất sinh. Luân chuyển giữa gươm cận chiến và súng ngắn để tích lũy điểm Phong Cách từ E đến S, giải phóng Hỏa Ngục Triệu Hồi (Inferno Trigger) quét bão đạn liên hoàn không thể ngăn cản.",
    rarity: "Chí Tôn Xạ Thủ",
    element: "Kiếm Súng Hợp Thể · Lốc Xoáy Tử Thần Inferno Trigger"
  },
  {
    name: "Sejuani",
    title: "Cơn Thịnh Nộ Phương Bắc - Heo Rừng Bristle Freljord",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/sejuani.webp",
    meaning: "Thủ lĩnh dũng mãnh và tàn nhẫn của bộ tộc Móng Vuốt Mùa Đông xứ Freljord, cưỡi trên lưng con lợn rừng khổng lồ Bristle xông pha vào lửa tuyết. Gõ chùy băng vỡ tung lớp giáp, lao đầu húc tung chướng ngại và ném Dây Xích Băng Giá tung đòn Nhà Tù Băng Giá (Glacial Prison) đóng băng toàn bộ kẻ địch từ xa.",
    rarity: "Chí Tôn Nữ Tướng",
    element: "Dây Xích Băng Đen · Nhà Tù Băng Giá Hất Tung"
  },
  {
    name: "Senna",
    title: "Người Cứu Rỗi - Đại Pháo Cổ Vật Bóng Đêm",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Quần Đảo Bóng Đêm",
    image: "/assets/senna.webp",
    meaning: "Người vợ yêu dấu của Lucian từng bị Thresh giam cầm trong lồng đèn ma quái, học cách làm chủ Màn Sương Đen để trở về cõi sống cùng khẩu đại pháo cổ vật khổng lồ. Thu thập linh hồn tăng tầm bắn vô hạn, ẩn mình trong bóng đen và bắn Tia Sáng Cứu Rỗi xuyên bản đồ bảo hộ đồng minh và hủy diệt quân thù.",
    rarity: "Chí Tôn Nữ Tướng",
    element: "Pháo Hồn Ma Khổng Lồ · Bóng Đêm Buông Xuống Cứu Rỗi Toàn Cõi"
  },
  {
    name: "Seraphine",
    title: "Ca Sĩ Ngôi Sao - Tiếng Hát Đồng Điệu Linh Hồn",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/seraphine.webp",
    meaning: "Nữ ca sĩ trẻ Piltover có khả năng lắng nghe tiếng hát của linh hồn vạn vật, nỗ lực dùng âm nhạc gắn kết sự hòa hợp giữa Piltover và Zaun. Đứng trên bục sân khấu Hextech lướt đi nhẹ nhàng, hòa âm nốt nhạc tăng tầm chiêu thức và phóng Khúc Cao Trào (Encore) mê hoặc kéo dài qua từng mục tiêu chạm phải.",
    rarity: "Huyền Thoại Ngôi Sao",
    element: "Sóng Âm Hài Hòa · Khúc Cao Trào Hát Mê Hoặc"
  },
  {
    name: "Shaco",
    title: "Tên Hề Quỷ - Hộp Hề Kinh Hoàng Dao Găm Sau Lưng",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Liên Minh Huyền Thoại",
    image: "/assets/shaco.webp",
    meaning: "Búp bê rối cổ xưa bị ma thuật hắc ám xâm chiếm trở thành sát thủ hề điên loạn luôn lấy tiếng cười từ sự thống khổ của nạn nhân. Dịch chuyển tàng hình tung đòn chí mạng đâm lén sau lưng, đặt Hộp Hề Kinh Hoàng gây hoảng sợ và phân thân thành hai cá thể phát nổ gieo rắc hỗn loạn.",
    rarity: "Chí Tôn Quỷ Dị",
    element: "Lừa Gạt Tàng Hình · Phân Thân Hộp Hề Nổ Tung"
  },
  {
    name: "Shyvana",
    title: "Nửa Rồng Demacia - Hóa Thân Rồng Lửa Cuồng Nộ",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vương Quốc Demacia",
    image: "/assets/shyvana.webp",
    meaning: "Sinh vật lai giữa rồng lửa cổ xưa và con người, tìm thấy chốn dung thân dưới sự bảo hộ của Hoàng tử Jarvan IV và phục vụ trong đội Cận Vệ Hoàng Gia Demacia. Tích tụ nộ khí hóa thân thành con Rồng Lửa khổng lồ bay vút tới hất tung đối phương, khạc Cầu Lửa bùng nổ thiêu rụi cả một vùng đất.",
    rarity: "Chí Tôn Hóa Long",
    element: "Hơi Thở Rồng Lửa · Hóa Rồng Xung Phong Càn Quét"
  },
  {
    name: "Singed",
    title: "Dược Sĩ Điên - Khói Độc Hóa Kỹ Quật Ngã Zaun",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/singed.webp",
    meaning: "Nhà hóa học điên cuồng nhất Zaun, kẻ đã đánh đổi nhân tính để theo đuổi tri thức giả kim thuật tối thượng với bình độc dược khổng lồ sau lưng. Bật Đuôi Lửa Độc để lại vệt khí hủy diệt sau mỗi bước chạy, quẳng kẻ thù qua đầu dính Keo Siêu Dính và uống Thuốc Điên gia tăng mọi chỉ số thể chất phi thường.",
    rarity: "Huyền Thoại Hóa Kỹ",
    element: "Đuôi Khói Độc Hóa Học · Thuốc Điên Độc Dược Quật Ngã"
  },
  {
    name: "Skarner",
    title: "Cổ Thú Đất Mẹ - Bọ Cạp Thổ Địa Ixtal",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Rừng Già Ixtal & Hoang Dã",
    image: "/assets/skarner.webp",
    meaning: "Hộ thần cổ xưa của vùng đất ngàn năm Ixtal, người giữ gìn sự nguyên sơ của đất mẹ trước sự can thiệp của thế giới bên ngoài. Đào bới xuyên lòng đất, nhấc bổng tảng đá khổng lồ ném vào mục tiêu và kích hoạt Giam Cầm (Impale) kéo lê cùng lúc nhiều kẻ địch vào vùng diệt vong.",
    rarity: "Chí Tôn Cổ Thú",
    element: "Địa Chấn Ixtal · Giam Cầm Kéo Ba Mục Tiêu"
  },
  {
    name: "Smolder",
    title: "Tiểu Hỏa Long - Hơi Thở Lửa Gia Tộc Hoàng Gia",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/smolder.webp",
    meaning: "Chú rồng nhỏ đáng yêu thuộc dòng dõi rồng hoàng gia Camavor cổ đại, đang học cách kiểm soát ngọn lửa rực cháy dưới sự dạy dỗ của mẹ. Tích lũy điểm Long Hỏa tiến hóa đòn bắn thành sát thương chuẩn thiêu rụi, bay lượn qua tường và gọi mẹ Rồng Khổng Lồ bay qua trút bão lửa hồi phục sinh lực cho con.",
    rarity: "Huyền Thoại Hỏa Long",
    element: "Hơi Thở Hỏa Long Tiến Hóa · Tiếng Gọi Mẹ Rồng Khổng Lồ"
  },
  {
    name: "Swain",
    title: "Đại Tướng Noxus - Ác Quỷ Raum Hóa Thân Quạ Đen",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/swain.webp",
    meaning: "Thống soái tối cao của đế quốc Noxus, người đã khuất phục con quỷ bí mật Raum dưới lòng Pháo Đài Bất Diệt để nhìn thấu mọi âm mưu khắp cõi Runeterra. Phóng Tầm Nhìn Đế Chế và Trói Chân kẻ thù, kích hoạt Hóa Quỷ (Demonic Ascension) mở rộng đôi cánh hắc ám hút cạn sinh lực đối thủ liên tục.",
    rarity: "Chí Tôn Thống Soái",
    element: "Bàn Tay Ác Quỷ Raum · Hóa Quỷ Hút Hồn Bất Tử"
  },
  {
    name: "Syndra",
    title: "Nữ Chúa Bóng Tối - Quả Cầu Hắc Ám Bùng Nổ Ionia",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Đất Đầu Tiên Ionia",
    image: "/assets/syndra.webp",
    meaning: "Phù thủy quyền năng kinh hoàng của Ionia sở hữu tiềm năng ma thuật vô hạn, từ chối mọi giới hạn kìm kẹp để nâng bổng cả pháo đài bay lơ lửng trên bầu trời. Ngưng tụ các Quả Cầu Bóng Tối ném đi hoặc đẩy lùi làm choáng đối thủ, trước khi trút toàn bộ số cầu vào đầu một mục tiêu trong Bùng Nổ Sức Mạnh (Unleashed Power).",
    rarity: "Chí Tôn Đại Pháp Sư",
    element: "Quả Cầu Bóng Tối · Bùng Nổ Sức Mạnh Tối Thượng"
  },
  {
    name: "Tahm Kench",
    title: "Thủy Quái Đại Vương - Khế Ước Bụng Đói Nuốt Chửng",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Biển Bilgewater",
    image: "/assets/tahm_kench.webp",
    meaning: "Con quỷ cổ xưa ngự trị dòng nước Bilgewater, xuất hiện dưới hình hài một gã béo đội mũ hào hoa mang đến những khế ước cám dỗ đổi lấy sự tuyệt vọng của con mồi. Đánh roi lưỡi làm choáng kẻ thù, lặn ngụp Du Ngoạn Thủy Phủ và Nuốt Chửng (Devour) nuốt đồng đội để giải cứu hoặc nuốt kẻ thù vào bụng tiêu hóa.",
    rarity: "Chí Tôn Thủy Quái",
    element: "Chiếc Lưỡi Roi Ngon Miệng · Nuốt Chửng Bảo Hộ & Tiêu Hóa"
  },
  {
    name: "Talon",
    title: "Sát Thủ Bóng Đêm - Vượt Tường Lưỡi Dao Bay Noxus",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/talon.webp",
    meaning: "Lưỡi dao chết người nhất của gia tộc Du Couteau vùng Noxus, lớn lên từ những ngõ hẻm tối tăm và chỉ tôn sùng sức mạnh của lưỡi thép. Nhảy vọt qua mọi chướng ngại địa hình với Con Đường Sát Thủ, phóng chùm ám khí gây chảy máu và bùng nổ Sát Khí Ngút Trời tàng hình đoạt mạng đối thủ trong chớp mắt.",
    rarity: "Chí Tôn Sát Thủ",
    element: "Ám Khí Sắc Lẹm · Sát Khí Ngút Trời Vượt Mọi Địa Hình"
  },
  {
    name: "Trundle",
    title: "Vua Quỷ Khổng Lồ - Chùy Chân Băng Cột Trụ Freljord",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/trundle.webp",
    meaning: "Vị vua quỷ khổng lồ ranh mãnh và tàn bạo của Freljord, nắm giữ cây chùy Băng Chân Cổ Đại 'Boneshiver' có khả năng đóng băng và nghiền nát mọi thứ. Dựng Cột Băng chặn đường chạy trốn, tạo Vương Quốc Băng Hàn tăng tốc đánh và kích hoạt Chinh Phục hút cạn máu và giáp của tướng đỡ đòn đối phương.",
    rarity: "Chí Tôn Cự Quỷ",
    element: "Chùy Băng Boneshiver · Cột Băng Chinh Phục Tước Đoạt"
  },
  {
    name: "Tryndamere",
    title: "Cơn Thịnh Nộ Chiến Trường - Bất Tử 5 Giây Kiếm Đại",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/tryndamere.webp",
    meaning: "Thủ lĩnh kiêu hùng của tộc Avarosan và là phu quân của Nữ hoàng Ashe, người sống sót sau thảm sát diệt tộc nhờ hấp thụ ngọn lửa bóng tối của Aatrox. Tích lũy Nộ Khí chém chí mạng liên tục, xoay kiếm chém xuyên mục tiêu và kích hoạt Từ Chối Tử Thần (Undying Rage) trở nên bất tử trong 5 giây sinh tử.",
    rarity: "Huyền Thoại Bất Diệt",
    element: "Kiếm Khổng Lồ Cuồng Bạo · Từ Chối Tử Thần Bất Tử"
  },
  {
    name: "Twisted Fate",
    title: "Thần Bài - Bộ Bài Định Mệnh Dịch Chuyển Tức Thời",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Biển Bilgewater",
    image: "/assets/twisted_fate.webp",
    meaning: "Tay cờ bạc lãng tử khét tiếng nhất Bilgewater, sở hữu đôi tay ma thuật có thể biến những lá bài vô tri thành vũ khí sát thương chí mạng. Rút Bài Đỏ làm chậm, Bài Xanh hồi năng lượng và Bài Vàng làm choáng tuyệt đối, mở mắt Định Mệnh (Destiny) soi sáng toàn bản đồ rồi dịch chuyển tức thời gank bất ngờ.",
    rarity: "Chí Tôn Thần Bài",
    element: "Bài Vàng Khóa Chân · Định Mệnh Soi Sáng Toàn Bản Đồ"
  },
  {
    name: "Twitch",
    title: "Chuột Xạ Thủ - Nỏ Độc Tàng Hình Bắn Xuyên Mọi Thứ",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/twitch.webp",
    meaning: "Chú chuột đột biến từ những cống rãnh hóa chất độc hại sâu nhất của Zaun, sở hữu khẩu nỏ tự chế tẩm đầy dịch độc chết người. Đi rình rập ngụy trang áp sát bất ngờ, ném Chai Độc làm chậm và kích hoạt Nhắm Mắt Bắn Bừa (Spray and Pray) bắn những mũi tên độc xuyên thấu cả đội hình địch từ tầm cực xa.",
    rarity: "Huyền Thoại Độc Dược",
    element: "Độc Chết Người · Chuột Nhắt Tàng Hình Bắn Tỉa Xuyên Thấu"
  },
  {
    name: "Udyr",
    title: "Lữ Khách Tinh Linh - Thế Thần Bốn Thần Thú Freljord",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/udyr.webp",
    meaning: "Lữ khách tâm linh vĩ đại nhất của Freljord, người có thể kết nối và đón nhận sức mạnh của các Bán Thần nguyên thủy: Lợn Rừng, Phượng Hoàng, Gấu Thần Sấm và Dê Núi Ornn. Chuyển đổi linh hoạt giữa các thế võ, làm choáng kẻ thù bằng cú vồ sấm sét và triệu hồi bão tuyết càn quét mọi chiến trường.",
    rarity: "Chí Tôn Linh Thú",
    element: "Tứ Thần Thú Nhập Thể · Vuốt Gấu Sấm Sét Băng Phượng"
  },
  {
    name: "Urgot",
    title: "Pháo Đài Hóa Kỹ - Lò Xay Thịt Mũi Khoan Tử Thần",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/urgot.webp",
    meaning: "Cựu đao phủ Noxus bị phản bội giam cầm trong mỏ hóa chất Đáy Zaun, tự gắn vào cơ thể mình những cỗ máy cơ khí và sáu chân nhện sắt tàn bạo. Bắn lựu đạn hóa kỹ, liên tục xả đạn từ súng máy càn quét và bắn Mũi Khoan Tử Thần (Fear Beyond Death) kéo kẻ địch hấp hối vào lò xay thịt nghiền nát.",
    rarity: "Chí Tôn Cơ Giới",
    element: "Đầu Gối Phóng Hỏa Hóa Kỹ · Mũi Khoan Tử Thần Kéo Về Xay Thịt"
  },
  {
    name: "Veigar",
    title: "Bậc Thầy Ma Thuật Hắc Ám - Năng Lượng Thiên Thạch Vô Hạn",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Bandle",
    image: "/assets/veigar.webp",
    meaning: "Pháp sư Yordle tí hon từng bị giam cầm trong pháo đài của Mordekaiser, say mê ma thuật hắc ám và luôn muốn chứng minh mình là ác nhân vĩ đại nhất trần đời. Tích tụ sức mạnh phép thuật vô hạn qua mỗi lần tung chiêu, dựng Lồng Bẻ Cong Không Gian và phóng Vụ Nổ Vũ Trụ (Primordial Burst) xóa sổ đối thủ trong tích tắc.",
    rarity: "Chí Tôn Hắc Ám",
    element: "Bẻ Cong Không Gian · Vụ Nổ Vũ Trụ Một Phát Chết Luôn"
  },
  {
    name: "Vex",
    title: "Nỗi Buồn Ảm Đạm - Cái Bóng U Sầu Trừng Phạt Lướt Tới",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Quần Đảo Bóng Đêm",
    image: "/assets/vex.webp",
    meaning: "Cô nàng Yordle cá biệt mang nỗi u sầu vĩnh cửu, ghét cay ghét đắng sự màu mè và lạc quan, tìm thấy sự đồng điệu cùng Màn Sương Đen trên Quần Đảo Bóng Đêm. Sử dụng Cái Bóng trừng phạt những kẻ thích lướt nhảy nhót, ngắt chiêu làm hoảng sợ và phóng Bão Tố U Sầu (Shadow Surge) bay thẳng vào mặt kẻ thù.",
    rarity: "Huyền Thoại U Ám",
    element: "Cái Bóng U Sầu · Bão Tố U Sầu Bay Tới Trừng Phạt"
  },
  {
    name: "Viktor",
    title: "Sứ Giả Máy Móc - Tiến Hóa Huy Hoàng Tia Chết Chóc",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/viktor.webp",
    meaning: "Nhà khoa học tiên phong của Zaun cống hiến cả cuộc đời cho lý tưởng 'Tiến Hóa Huy Hoàng', thay thế thể xác yếu đuối bằng công nghệ cơ khí hoàn hảo. Nâng cấp bộ kỹ năng Hextech, phóng Tia Chết Chóc quét vệt laser nổ kép và triệu hồi Bão Điện Từ (Chaos Storm) câm lặng và thiêu đốt đội hình đối phương.",
    rarity: "Chí Tôn Cơ Giới",
    element: "Lõi Năng Lượng Hextech · Tia Chết Chóc Bão Từ Trường"
  },
  {
    name: "Vladimir",
    title: "Huyết Thuật Sư Cổ Đại - Hồ Máu Thủy Triều Hắc Ám",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Noxus",
    image: "/assets/vladimir.webp",
    meaning: "Bậc thầy thao túng huyết thuật cổ xưa từ thời chiến tranh Darkin, người đứng sau bức màn quyền lực thao túng dòng chảy lịch sử của đế chế Noxus qua hàng thế kỷ. Hút máu hồi phục sinh lực, lặn vào Hồ Máu bất khả xâm phạm và gieo rắc Máu Độc (Hemoplague) khuếch đại sát thương và phát nổ quét sạch diện rộng.",
    rarity: "Chí Tôn Huyết Thần",
    element: "Huyết Thuật Cổ Xưa · Hồ Máu Hắc Ám Máu Độc Lan Tỏa"
  },
  {
    name: "Volibear",
    title: "Tiếng Gầm Sấm Sét - Bão Tố Ngàn Nhát Chém Bán Thần",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Băng Xứ Freljord",
    image: "/assets/volibear.webp",
    meaning: "Bán Thần gấu cổ xưa mang sức mạnh cuồng nộ hoang dã của sấm sét Freljord, căm ghét nền văn minh loài người và sự hòa bình giả tạo. Tích tụ sấm sét trong từng đòn vuốt xé toạc kẻ thù, cắn xé hồi phục sinh lực và hóa thân Lôi Thần Giáng Thế (Stormbringer) đập tan trụ phòng ngự và làm chậm đối thủ.",
    rarity: "Chí Tôn Bán Thần",
    element: "Sấm Sét Hoang Dã · Lôi Thần Giáng Thế Vô Hiệu Trụ"
  },
  {
    name: "Wukong",
    title: "Ngộ Không Wuju - Gậy Như Ý Lốc Xoáy Ionia",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Vùng Đất Đầu Tiên Ionia",
    image: "/assets/wukong.webp",
    meaning: "Chiến binh Vastaya loài khỉ tinh nghịch xứ Ionia, đệ tử chân truyền của Kiếm sư Master Yi và nắm giữ bí thuật Wuju cùng cây gậy như ý thần kỳ của Doran. Tung phân thân Chim Mồi đánh lừa kẻ thù, phóng Thiết Bảng đập vỡ giáp và xoay tít Lốc Xoáy (Cyclone) hai lần liên tiếp hất tung toàn bộ đội hình đối phương.",
    rarity: "Chí Tôn Chiến Thần",
    element: "Kim Cô Bổng Như Ý · Lốc Xoáy Chiến Binh Wuju Hất Tung"
  },
  {
    name: "Xerath",
    title: "Pháp Sư Thăng Hoa Thuần Năng Lượng - Nghi Thức Tận Diệt",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/xerath.webp",
    meaning: "Cựu nô lệ Shurima đã phản bội hoàng đế Azir trong Đại Lễ Thăng Hoa, chiếm đoạt toàn bộ sức mạnh của Đĩa Mặt Trời để biến thành một thực thể thuần năng lượng ma pháp bị giam cầm trong những mảnh vỡ quan tài. Bắn Xung Kích Điện tầm xa và khai hỏa Nghi Thức Ma Pháp (Rite of the Arcane) bắn những quả pháo ma thuật xuyên nửa bản đồ.",
    rarity: "Chí Tôn Thần Ma",
    element: "Năng Lượng Ma Pháp Cực Đại · Nghi Thức Ma Pháp Tầm Siêu Xa"
  },
  {
    name: "Yuumi",
    title: "Cô Mèo Ma Thuật - Sách Thần Cuốn Trôi Bandle",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Bandle",
    image: "/assets/yuumi.webp",
    meaning: "Mèo cưng ma thuật của nữ phù tinh Norra vùng Bandle, cưỡi trên cuốn Sách Thần biết bay để ngao du khắp các cổng không gian tìm kiếm chủ nhân. Bám vào bạn thân bảo hộ và tăng tốc độ, bắn Mũi Tên Thơ Thẩn dẫn đường và mở rộng Chương Cuối (Final Chapter) tung ra 7 đợt sóng ma thuật cầm chân mọi kẻ thù.",
    rarity: "Huyền Thoại Ma Thuật",
    element: "Sách Thần Tinh Linh · Chương Cuối Sóng Ma Thuật Mở Rộng"
  },
  {
    name: "Zaahen",
    title: "Darkin Bất Khuất - Chiến Kích Darkin Trở Về",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Liên Minh Huyền Thoại",
    image: "/assets/zaahen.webp",
    meaning: "Vị chiến thần Darkin cổ xưa mang ý chí kiên định và phẩm giá cao quý, người từng chiến đấu bảo vệ Ionia trong Đại Chiến Darkin rồi tự nguyện phong ấn linh hồn vào ngọn chiến kích để ngăn chặn sự tha hóa. Tích lũy Nộ Khí Chiến Tranh, vung Song Kích hất tung đối thủ và kích hoạt Cải Tử Hoàn Sinh (Grim Deliverance) hồi sinh thần thánh đạp bằng mọi gian khó.",
    rarity: "Chí Tôn Thần Ma Darkin",
    element: "Chiến Kích Darkin Thần Binh · Cải Tử Hoàn Sinh Bất Diệt"
  },
  {
    name: "Zeri",
    title: "Tia Lửa Zaun - Súng Điện Tích Điện Siêu Tốc",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Thành Phố Piltover & Zaun",
    image: "/assets/zeri.webp",
    meaning: "Cô gái trẻ tràn đầy năng lượng và tình yêu gia đình từ tầng lớp lao động Zaun, bẩm sinh có khả năng dẫn truyền điện năng từ cảm xúc. Khoác chiếc áo chống điện và khẩu súng bắn điện tử, lướt qua mọi bức tường với Nhanh Như Chớp và bùng nổ Điện Đạt Đỉnh Điểm (Lightning Crash) đạt tốc độ di chuyển và xả đạn thần sầu.",
    rarity: "Huyền Thoại Xạ Thủ",
    element: "Dòng Điện Ma Năng · Điện Đạt Đỉnh Điểm Siêu Tốc Độ"
  },
  {
    name: "Zilean",
    title: "Giám Hộ Thời Gian - Đồng Hồ Đảo Ngược Vận Mệnh",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đế Chế Cát Shurima",
    image: "/assets/zilean.webp",
    meaning: "Pháp sư vĩ đại của thành bang Icathia cổ xưa, người duy nhất sống sót sau thảm họa Hư Không bằng cách trôi dạt trong dòng chảy thời gian bất tận để tìm kiếm con đường cứu vãn quê hương. Ném Bom Hẹn Giờ làm choáng, điều khiển tốc độ thời gian và niệm chú Đảo Ngược Thời Gian (Chrono Shift) bảo vệ linh hồn đồng minh sống lại từ cõi chết.",
    rarity: "Chí Tôn Đại Pháp Sư",
    element: "Dòng Chảy Thời Gian · Bom Hẹn Giờ · Đảo Ngược Thời Gian Hồi Sinh"
  },
  {
    name: "Zoe",
    title: "Bậc Thầy Biến Ảo - Thượng Nhân Tinh Quái Targon",
    category: "lien_minh",
    categoryLabel: "Liên Minh Huyền Thoại",
    faction: "Đỉnh Núi Linh Thiêng Targon",
    image: "/assets/zoe.webp",
    meaning: "Hiện thân cổ xưa của sự biến ảo, tinh nghịch và thông điệp vũ trụ trên đỉnh Targon, mang hình hài một cô bé tóc dài rực rỡ sắc màu không bao giờ già. Nhảy qua Cổng Không Gian nhặt các phép bổ trợ rơi rớt, bắn Bong Bóng Ngủ ru ngủ đối phương từ xuyên tường và phóng Nghịch Sao (Paddle Star) từ khoảng cách cực đại dứt điểm kẻ địch chớp mắt.",
    rarity: "Chí Tôn Thượng Nhân",
    element: "Bong Bóng Ngủ Mê Mẩn · Nghịch Sao Khúc Xạ Một Phát Bay Màu"
  }
];

// 1. Read existing lien_minh.json
const lmPath = 'src/data/chibi/lien_minh.json';
const existingLM = JSON.parse(fs.readFileSync(lmPath, 'utf-8'));
const startId = existingLM.length + 1;

const championsWithIds = newChampions.map((champ, idx) => {
  const num = startId + idx;
  const idStr = num < 10 ? `LM-0${num}` : `LM-${num}`;
  return {
    id: idStr,
    ...champ
  };
});

const updatedLM = [...existingLM, ...championsWithIds];
fs.writeFileSync(lmPath, JSON.stringify(updatedLM, null, 2), 'utf-8');
console.log(`Updated ${lmPath}: ${existingLM.length} -> ${updatedLM.length} cards (Added ${championsWithIds.length} new champions).`);

// 2. Rebuild all_chibi.json
const cats = [
  'than_gioi',
  'tay_du',
  'ma_gioi',
  'viet_nam',
  'tam_quoc',
  'kim_dung',
  'phong_van',
  'wwe',
  'lien_minh'
];

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
const usedInDb = new Set(allCharacters.map(c => path.basename(c.image).toLowerCase()));
const unmapped = allAssets.filter(f => !usedInDb.has(f.toLowerCase()) && f.endsWith('.webp') && f !== 'media_1787939166360.webp');

console.log(`\nUnmapped webp assets in public/assets: ${unmapped.length}`);
if (unmapped.length > 0) {
  console.log('Unmapped files:', unmapped);
} else {
  console.log('🎉 ALL webp champion assets are 100% matched and mapped into database!');
}
