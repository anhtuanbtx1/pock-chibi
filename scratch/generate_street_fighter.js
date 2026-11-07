const fs = require('fs');
const path = require('path');

const streetFighterCards = [
  {
    name: "Ryu (The Eternal Wanderer)",
    title: "Long Quyền Bất Hủ - Đạo Sĩ Lang Thang Tối Thượng",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Võ Đài Đường Phố · Phái Ansatsuken",
    image: "/assets/street-fighter/ryu.webp",
    meaning: "Biểu tượng tối cao của Street Fighter và võ đạo chân chính thế giới. Người võ sĩ lang thang cả đời tầm sư học đạo, khắc chế hoàn toàn Sát Ý (Satsui no Hado) để thức tỉnh Hư Vô Chi Cảnh (Power of Nothingness / Mu no Hado). Sở hữu sóng Hào Khí Công Hadouken kinh thiên động địa, Thăng Long Quyền Shoryuken và Toàn Phong Cước Tatsumaki Senpukyaku khai mở cảnh giới võ thuật đỉnh phong.",
    rarity: "Chí Tôn Quyền Thần",
    element: "Chân Thần Ansatsuken · Khí Công Hadouken Vô Hạn"
  },
  {
    name: "Ken Masters (The Fire Dragon)",
    title: "Hỏa Long Quyền Hoa Kỳ - Đồng Môn Ansatsuken Vô Địch",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Võ Đài Đường Phố · Phái Ansatsuken",
    image: "/assets/street-fighter/ken-master.webp",
    meaning: "Võ sĩ triệu phú nước Mỹ cùng bái Gouken làm sư phụ với Ryu, người bạn thân và kình địch vĩ đại nhất đời anh. Trái ngược với phong cách trầm tĩnh của Ryu, Ken thổi bùng ngọn lửa rực cháy vào từng đòn Thăng Long Quyền rực lửa (Flaming Shoryuken), chuỗi cước Shoryuretsu và tuyệt kỹ Thần Long Quyền Shinryuken xoay tít trời cao.",
    rarity: "Chí Tôn Hỏa Quyền",
    element: "Hỏa Long Shoryuken · Ansatsuken Rực Cháy"
  },
  {
    name: "Akuma (Gouki - The Master of the Fist)",
    title: "Quyền Ma Vô Song - Bá Chủ Sát Ý Hắc Ám Satsui no Hado",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Võ Đài Đường Phố · Phái Ansatsuken",
    image: "/assets/street-fighter/akuma.webp",
    meaning: "Bậc thầy võ thuật tuyệt đối buông bỏ nhân tính để đón nhận trọn vẹn bản năng sát thủ tàn khốc Satsui no Hado. Mang chữ 'Thiên' (天) rực lửa sau lưng áo, tung ra Hào Khí Công Gohadoken hủy diệt, Goshoryuken xé toạc bầu trời và tuyệt kỹ tối thượng Thuấn Ngục Sát (Shun Goku Satsu) đày đọa linh hồn kẻ thù vào địa ngục vô tận.",
    rarity: "Chí Tôn Quyền Ma",
    element: "Satsui no Hado · Thuấn Ngục Sát Vô Địch"
  },
  {
    name: "Chun-Li (The First Lady of Fighting)",
    title: "Đệ Nhất Mỹ Nữ Song Cước - Nữ Đặc Vụ Công Lý Interpol",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Vệ Binh Công Lý & Đặc Nhiệm Interpol",
    image: "/assets/street-fighter/chun-li.webp",
    meaning: "Huyền thoại sống của làng game đối kháng toàn cầu, nữ đặc vụ Interpol quả cảm quyết tâm tìm lại công lý cho người cha bị Shadaloo hãm hại. Đôi chân thép thần sầu tung ra tuyệt chiêu Bách Liệt Cước (Hyakuretsukyaku) nhanh như chớp giật, Khí Công Chưởng (Kikoken) và đòn xoay người đảo trời Spinning Bird Kick chấn nhiếp mọi tà ác.",
    rarity: "Chí Tôn Nữ Hiệp",
    element: "Bách Liệt Thần Cước · Spinning Bird Kick Khí Công"
  },
  {
    name: "Guile (Major of the US Air Force)",
    title: "Thiếu Tá Không Quân Hoa Kỳ - Bức Tường Thép Sonic Boom",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Vệ Binh Công Lý & Đặc Nhiệm Interpol",
    image: "/assets/street-fighter/guile.webp",
    meaning: "Sĩ quan không quân mẫu mực của quân đội Mỹ, thề quyết tâm truy quét tội ác Shadaloo để trả thù cho người đồng đội thân thiết Charlie Nash. Nổi danh với kiểu tóc chải ngược biểu tượng, đấu pháp phòng thủ phản công vững như bàn thạch cùng tuyệt kỹ ném đao khí Sonic Boom và cú đá lộn ngược Flash Kick xé toạc không trung.",
    rarity: "Chí Tôn Chiến Tướng",
    element: "Khí Kiếm Sonic Boom · Cước Phá Flash Kick"
  },
  {
    name: "M. Bison (General Vega - Lord of Psycho Power)",
    title: "Bá Chủ Shadaloo - Chúa Tể Năng Lượng Tâm Linh Hắc Ám",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/bison.webp",
    meaning: "Tổng tư lệnh tối cao của tổ chức tội phạm xuyên quốc gia Shadaloo, hiện thân của tham vọng thống trị toàn cầu bằng năng lượng tà ác Psycho Power tím thẫm. Lướt đi trên không trung với Psycho Crusher thiêu rụi đối thủ, dẫm nát kẻ thù bằng Head Press và liên tục tái sinh qua các thể xác nhân tạo hoàn mỹ.",
    rarity: "Chí Tôn Ma Đầu",
    element: "Psycho Power Hủy Diệt · Psycho Crusher Ma Hỏa"
  },
  {
    name: "Cammy White (Killer Bee - Delta Red)",
    title: "Ong Bắp Cày Tốc Độ - Nữ Đặc Nhiệm Tinh Nhuệ Delta Red",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Vệ Binh Công Lý & Đặc Nhiệm Interpol",
    image: "/assets/street-fighter/cammy-white.webp",
    meaning: "Từng là búp bê sát thủ 'Killer Bee' mất trí nhớ của Shadaloo trước khi được giải cứu và gia nhập lực lượng đặc nhiệm Delta Red của tình báo Anh Quốc. Nổi tiếng với những cú lộn nhào xé gió Spiral Arrow, Cannon Spike trên không và tốc độ áp sát chớp nhoáng hàng đầu thế giới võ đài.",
    rarity: "Huyền Thoại Nữ Binh",
    element: "Phong Lôi Thần Tốc · Spiral Arrow Xuyên Phá"
  },
  {
    name: "Zangief (The Red Cyclone)",
    title: "Lốc Xoáy Đỏ Xô Viết - Thiết Cốt Đô Vật Vật Gấu Huyền Thoại",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/zangief.webp",
    meaning: "Võ sĩ đô vật chuyên nghiệp vĩ đại nhất nước Nga, được mệnh danh là 'Lốc Xoáy Đỏ' với thân hình cơ bắp thép đầy sẹo chiến tích sau những năm tháng rèn luyện vật gấu tuyết Siberia. Nổi danh toàn cầu với đòn xoay tít cắm đầu xuống sàn Spinning Piledriver (SPD), Banishing Flat và tiếng gầm ái quốc rực lửa 'My loyal fans!'.",
    rarity: "Chí Tôn Đô Vật",
    element: "Thiết Giáp Cơ Bắp · Spinning Piledriver Lốc Xoáy"
  },
  {
    name: "Dhalsim (The Flame of Yoga)",
    title: "Đại Sư Yoga Ấn Độ - Hỏa Diệm Tĩnh Tâm Bất Diệt",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/dhalsim.webp",
    meaning: "Bậc thầy Yoga cao quý vùng thung lũng sông Hằng Ấn Độ, người đạt tới cảnh giới thanh tịnh dung hợp với ngọn lửa thần Agni. Khả năng kéo giãn cơ thể phi thường vươn xa hàng chục mét, dịch chuyển tức thời Yoga Teleport và phun biển lửa thần thánh Yoga Fire / Yoga Flame thiêu rụi tà khí.",
    rarity: "Chí Tôn Du Già",
    element: "Thần Hỏa Agni · Yoga Biến Hóa Khôn Lường"
  },
  {
    name: "Sagat (The Emperor of Muay Thai)",
    title: "Đế Vương Muay Thai Bất Bại - Hổ Thần Đấu Trường Thái Lan",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/sagat.webp",
    meaning: "Bậc đế vương huyền thoại của võ thuật Muay Thai Thái Lan, kẻ mang vết sẹo lớn trên ngực từ trận chiến định mệnh với Ryu. Với thể hình khổng lồ và tinh thần chiến binh bất khuất, Sagat làm chủ võ đài bằng những quả cầu năng lượng Tiger Shot xé gió, gối bay Tiger Knee và cú đấm cọp gầm Tiger Uppercut long trời lở đất.",
    rarity: "Chí Tôn Đế Vương",
    element: "Muay Thai Hổ Thần · Tiger Uppercut Lôi Đình"
  },
  {
    name: "Balrog (The Raging Buffalo)",
    title: "Cuồng Ngưu Quyền Vương - Tứ Đại Thiên Vương Shadaloo",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/balrog.webp",
    meaning: "Võ sĩ quyền anh hạng nặng bị trục xuất khỏi sàn đấu chuyên nghiệp vì bản tính tàn nhẫn và những đòn đánh chết người. Trở thành cánh tay phải đắc lực của M. Bison, nổi danh với những cú đấm trực diện rách gió Dash Straight, Buffalo Headbutt và Gigaton Punch nghiền nát xương cốt đối thủ.",
    rarity: "Chí Tôn Quyền Vương",
    element: "Thiết Quyền Hắc Ám · Cuồng Ngưu Gigaton Punch"
  },
  {
    name: "Vega (The Spanish Ninja)",
    title: "Ninja Đấu Bò Tây Ban Nha - Tử Thần Vuốt Thép Đeo Mặt Nạ",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/vega.webp",
    meaning: "Quý tộc Tây Ban Nha bị ám ảnh bệnh hoạn bởi cái đẹp và sự hoàn mỹ, một trong Tứ Đại Thiên Vương khét tiếng của Shadaloo. Kết hợp võ thuật Ninjutsu với kỹ thuật đấu bò tót tàn bạo, đeo mặt nạ sắt bảo vệ dung nhan và dùng móng vuốt thép Flying Barcelona Attack xé rách con mồi từ trên lồng sắt.",
    rarity: "Chí Tôn Vuốt Thép",
    element: "Móng Vuốt Tử Thần · Đấu Bò Flying Barcelona"
  },
  {
    name: "E. Honda (The Yokozuna)",
    title: "Yokozuna Sumo Nhật Bản - Bàn Tay Trăm Chưởng Thần Tốc",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/e-honda.webp",
    meaning: "Võ sĩ Sumo đẳng cấp Yokozuna mang trong mình sứ mệnh quảng bá tinh hoa đấu vật truyền thống Nhật Bản ra toàn cầu. Thân hình đồ sộ vững chãi như núi Phú Sĩ, tung đòn tát bão tố Trăm Bàn Tay (Hyakuretsu Harite), thiết đầu công Húc Đầu Bay Sumo và đòn dập mông Oicho Throw chấn động sàn đấu.",
    rarity: "Huyền Thoại Yokozuna",
    element: "Sumo Phú Sĩ · Bách Liệt Bàn Tay Thần Tốc"
  },
  {
    name: "Blanka (The Feral Beast)",
    title: "Mãnh Thú Rừng Xanh Amazon - Tia Chớp Rừng Nhiệt Đới",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/blanka.webp",
    meaning: "Cậu bé sống sót sau tai nạn máy bay giữa rừng rậm nhiệt đới Brazil, đột biến làn da xanh lục và hấp thụ khả năng sinh điện từ loài lươn điện khổng lồ. Di chuyển bằng những cú cuộn mình Rolling Attack xé gió và phóng luồng điện sinh học Electric Thunder giật tê liệt toàn bộ kẻ thù.",
    rarity: "Huyền Thoại Dã Thú",
    element: "Tia Chớp Lôi Điện · Cuộn Mình Rolling Attack"
  },
  {
    name: "Juri Han (The Spider of Taekwondo)",
    title: "Hắc Yểm Ma Nữ - Quỷ Cước Mắt Phong Thủy Hàn Quốc",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/juri-han.webp",
    meaning: "Nữ sát thủ điên loạn mang lòng căm thù sâu sắc với Shadaloo sau khi gia đình bị sát hại. Con mắt trái được cấy ghép động cơ Feng Shui Engine khuếch đại năng lực lên cực hạn, thi triển cước pháp Taekwondo tàn bạo Fuhajin rạch nát không gian với nụ cười ngạo nghễ.",
    rarity: "Truyền Thuyết Ma Nữ",
    element: "Feng Shui Engine · Quỷ Cước Taekwondo Fuhajin"
  },
  {
    name: "Luke Sullivan (The MMA Striker)",
    title: "Đấu Sĩ Bộc Phá Tương Lai - Cựu Đặc Nhiệm MMA Đỉnh Cao",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Vệ Binh Công Lý & Đặc Nhiệm Interpol",
    image: "/assets/street-fighter/luke-sullivan.webp",
    meaning: "Gương mặt đại diện cho kỷ nguyên mới của Street Fighter, cựu đặc nhiệm quân đội Mỹ chuyển hướng trở thành võ sĩ MMA và huấn luyện viên võ thuật tự do. Nổi tiếng với những cú đấm thẳng siêu nhanh Sand Blaster, Flash Knuckle xung điện và tinh thần chiến đấu bùng nổ hết mình.",
    rarity: "Chí Tôn Đấu Sĩ",
    element: "Xung Lực Cận Chiến · Sand Blaster Bộc Phá"
  },
  {
    name: "Jamie Siu (The Peacekeeper of Chinatown)",
    title: "Túy Quyền Đường Phố - Vũ Sĩ Nhào Lộn Chinatown",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/jamie-siu.webp",
    meaning: "Chiến binh bảo hộ khu phố người Hoa tại Metro City, tôn sùng hai huynh đệ song sinh Yun & Yang như thần tượng. Kết hợp tuyệt kỹ Túy Quyền (Drunken Fist) truyền thống với vũ đạo Breakdance đường phố, nâng cao nồng độ say từ bình thảo dược để kích hoạt những chuỗi đòn cước cuồng loạn.",
    rarity: "Huyền Thoại Túy Quyền",
    element: "Túy Quyền Cuồng Loạn · Breakdance Thần Sầu"
  },
  {
    name: "Kimberly Jackson (The Ninja Prodigy)",
    title: "Nhẫn Giả Hip-hop Thế Hệ Mới - Hậu Duệ Bushinryu Sắc Màu",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/kimberly-jackson.webp",
    meaning: "Thần đồng tốt nghiệp đại học sớm và say mê âm nhạc thập niên 80, bái Guy làm sư phụ để lĩnh hội bí truyền nhẫn thuật Bushinryu. Vũ khí độc đáo là những bình xịt sơn graffiti sắc màu kết hợp máy cassette nghe nhạc cổ điển, biến võ đài thành sàn diễn nhào lộn nghệ thuật rực rỡ.",
    rarity: "Huyền Thoại Thần Đồng",
    element: "Graffiti Sơn Nổ · Bushinryu Hip-hop Tốc Độ"
  },
  {
    name: "JP (Johann Petrovic)",
    title: "Trùm Tài Phiệt Psycho Hư Không - Kẻ Thao Túng Vận Mệnh",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/jp.webp",
    meaning: "Nhà tài phiệt quốc tế đứng đầu tổ chức bí ẩn, kế thừa và tinh chế năng lượng tà ác Psycho Power sang một đẳng cấp ma thuật thanh nhã và chết chóc. Tay cầm cây gậy ba-toong chứa kiếm ẩn, mở ra các cổng hư không Triglav và triệu hồi bóng ma cắn xé đối thủ từ xa.",
    rarity: "Chí Tôn Tài Phiệt",
    element: "Psycho Ma Trận Cổng Hư Không · Trượng Kiếm Quý Tộc"
  },
  {
    name: "Marisa (The Colosseum Gladiator)",
    title: "Nữ Giác Đấu Pankration - Hộ Pháp Đấu Trường Ý Cổ Đại",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/marisa.webp",
    meaning: "Nhà thiết kế trang sức kiêm hậu duệ của những dũng sĩ giác đấu La Mã cổ đại tại Ý. Sở hữu thể hình khổng lồ hộ pháp và phong cách quyền cước Pankration cổ xưa với cú đấm búa tạ Gladius và Phalanx nghiền nát khiên giáp đối thủ trong chớp mắt.",
    rarity: "Chí Tôn Giác Đấu",
    element: "Pankration La Mã · Thiết Giáp Đấm Gladius"
  },
  {
    name: "Manon (The Swan of the Tatami)",
    title: "Bạch Hạc Sàn Đấu - Siêu Mẫu Kiêm Quán Quân Judo Pháp",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/manon.webp",
    meaning: "Siêu mẫu thời trang hàng đầu nước Pháp kiêm nhà vô địch Judo Olympic, người kết hợp vẻ đẹp tao nhã của múa Ballet với nghệ thuật quật ngã của Nhu đạo. Từng cú xoay người Manege và đòn ném Dégagé nâng tầm đẳng cấp thi đấu lên tầm cao nghệ thuật quyến rũ chết người.",
    rarity: "Huyền Thoại Thiên Nga",
    element: "Ballet Nhu Đạo · Đòn Ném Manege Hoa Mỹ"
  },
  {
    name: "Lily (The Spirit Whisperer)",
    title: "Sứ Giả Gió Đại Ngàn - Hậu Duệ Tộc Thunderfoot",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/lily.webp",
    meaning: "Cô bé thuần khiết thuộc bộ tộc da đỏ Thunderfoot, người có khả năng giao cảm thiêng liêng với các linh hồn thiên nhiên của đại ngàn. Cầm đôi chiến chùy gỗ Pogamogan xoay tròn tạo thành lốc xoáy Condor Wind và lượn trên ngọn gió Condor Spire dũng mãnh.",
    rarity: "Huyền Thoại Linh Sứ",
    element: "Linh Hồn Gió Condor · Song Chùy Pogamogan"
  },
  {
    name: "A.K.I. (The Poisonous Serpent)",
    title: "Độc Thủ Mãng Xà - Đồ Đệ Tối Thượng Của F.A.N.G",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/aki.webp",
    meaning: "Nữ sát thủ quái đản đến từ Trung Hoa, đệ tử chân truyền của F.A.N.G với niềm say mê điên cuồng dành cho độc dược. Sử dụng bộ móng vuốt tẩm kịch độc cùng thế võ xà quyền trườn bò quái dị, gieo rắc tử thần vào mạch máu kẻ thù qua đòn Độc Trảo Cương Thi phong tỏa kinh mạch.",
    rarity: "Truyền Thuyết Ác Nữ",
    element: "Xà Quyền Kịch Độc · Móng Vuốt Xuyên Tâm"
  },
  {
    name: "Rashid (The Turbulent Wind)",
    title: "Cơn Lốc Sa Mạc Ả Rập - Chiến Binh Parkour Tự Do",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/rashid.webp",
    meaning: "Chàng công tử quý tộc hào hoa đến từ vùng Vịnh Trung Đông, vừa là chuyên gia công nghệ vừa là cao thủ phong thuật cổ xưa. Di chuyển bằng parkour lướt gió, tạo ra những cơn lốc xoáy cát xoáy tít Whirlwind Shot và tuyệt kỹ bay lượn Altair quét sạch mọi hiểm họa.",
    rarity: "Huyền Thoại Phong Tướng",
    element: "Cuồng Phong Sa Mạc · Parkour Khí Động Học"
  },
  {
    name: "Ed (The Neo Shadaloo Leader)",
    title: "Thủ Lĩnh Neo Shadaloo - Hậu Duệ Hỗn Thần Psycho Boxing",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/ed.webp",
    meaning: "Thực thể nhân tạo được thí nghiệm để trở thành thân xác dự phòng của M. Bison, được quyền vương Balrog nuôi nấng và chỉ dạy Boxing. Kết hợp sức mạnh ma thuật Psycho Power vào từng cú đấm Upper đay nghiến, thành lập Neo Shadaloo nhằm cứu giúp những số phận cùng cảnh ngộ.",
    rarity: "Huyền Thoại Quyền Thủ",
    element: "Psycho Boxing · Ma Lực Sợi Dây Neo Shadaloo"
  },
  {
    name: "Sakura Kasugano (The Blossoming Fighter)",
    title: "Đóa Hoa Anh Đào Võ Đạo - Nữ Sinh Ansatsuken Nhiệt Huyết",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Võ Đài Đường Phố · Phái Ansatsuken",
    image: "/assets/street-fighter/sakura-kasugano.webp",
    meaning: "Nữ sinh trung học đam mê võ thuật sau khi chứng kiến Ryu thi đấu, tự rèn luyện và sáng tạo nên phong cách Ansatsuken tươi mới tràn đầy sức sống. Bắn chưởng Hadouken hoa anh đào, lướt Thăng Long Quyền Shouoken và tung cước hoa bay làm rung động mọi sàn đấu.",
    rarity: "Huyền Thoại Nữ Sinh",
    element: "Anh Đào Ansatsuken · Shouoken Tươi Trẻ"
  },
  {
    name: "Dan Hibiki (The Pink Menace)",
    title: "Chưởng Môn Phái Saikyo - Đấu Sĩ Hồng Y Lạc Quan",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Võ Đài Đường Phố · Phái Ansatsuken",
    image: "/assets/street-fighter/dan-hibiki.webp",
    meaning: "Võ sư tự phong sáng lập môn phái 'Võ Vô Địch Saikyo-ryu' với bộ võ phục màu hồng đặc trưng và sự tự tin ngút trời. Tung ra những đòn chưởng Gadoken tầm ngắn hài hước, Kouruken rực lửa và màn khiêu khích trứ danh Taunt huyền thoại làm nức lòng khán giả.",
    rarity: "Huyền Thoại Hài Hước",
    element: "Saikyo-ryu Võ Đạo · Khiêu Khích Vô Song"
  },
  {
    name: "Cody Travers (The Mayor of Metro City)",
    title: "Hào Kiệt Metro City - Thị Trưởng Giới Phong Trần",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/cody-travers.webp",
    meaning: "Người anh hùng huyền thoại của Metro City từ kỷ nguyên Final Fight, từng ngồi tù vì bản tính nghiện đánh đấm đường phố trước khi trở thành vị thị trưởng đầy phong cách và trách nhiệm. Chiến đấu bằng nắm đấm bọc lốc xoáy Bad Stone, cú đá Ruffian Kick và lưỡi dao găm sắc bén giấu kín.",
    rarity: "Huyền Thoại Thị Trưởng",
    element: "Cuồng Phong Đường Phố · Lưỡi Dao Hào Kiệt"
  },
  {
    name: "Guy (The 39th Bushinryu Master)",
    title: "Đại Sư Đời Thứ 39 Phái Bushinryu - Nhẫn Giả Hành Hiệp Metro City",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/guy.webp",
    meaning: "Người kế thừa chân truyền đời thứ 39 của môn phái nhẫn thuật cổ Bushinryu Ninja, cùng Cody quét sạch băng nhóm tội phạm Mad Gear. Chiến đấu với tốc độ di chuyển lướt gió, đòn giẫm tường đạp vai Bushin Izuna Otoshi và những cú phi thân xuất quỷ nhập thần trừng trị kẻ gian.",
    rarity: "Huyền Thoại Nhẫn Giả",
    element: "Bushinryu Ninjutsu · Xuất Quỷ Nhập Thần"
  },
  {
    name: "Poison (The Whip of Metro City)",
    title: "Nữ Quản Lý Quyến Rũ - Chiếc Roi Gai Giới Ngầm Metro City",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/poison.webp",
    meaning: "Cựu thành viên quyến rũ nhưng nguy hiểm của băng nhóm tội phạm Mad Gear, sau chuyển sang làm quản lý đô vật chuyên nghiệp cùng Hugo. Tay cầm cây roi da gai góc quất rách không trung Whip of Love, nhào lộn điêu luyện và làm chủ mọi sàn diễn đường phố.",
    rarity: "Huyền Thoại Nữ Quản Lý",
    element: "Roi Gai Gai Góc · Nhào Lộn Đường Phố"
  },
  {
    name: "Alex (The Young Bull of NY)",
    title: "Chiến Thần Đô Vật New York - Biểu Tượng Thế Hệ Mới",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/alex.webp",
    meaning: "Đô vật cơ bắp xuất thân từ khu Manhattan, New York, người khởi đầu cho kỷ nguyên rực lửa của Street Fighter III. Sở hữu những đòn vật sấm sét như Flash Chop, Power Bomb và Hyper Bomb làm rung chuyển đấu trường thể thao đối kháng thế giới.",
    rarity: "Huyền Thoại Đô Vật",
    element: "Thiết Trảo Vật Sàn · Hyper Bomb Uy Mãnh"
  },
  {
    name: "Yun (The White Tiger of Hong Kong)",
    title: "Bạch Hổ Hồng Kông - Bát Cực Quyền Thiết Sơn Kháo Vô Song",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/yun.webp",
    meaning: "Người anh sôi nổi trong cặp song sinh Hồng Kông, người bảo hộ khu phố cùng chiếc ván trượt đường phố quen thuộc. Bậc thầy quyền thuật Bát Cực Quyền với tuyệt kỹ húc vai rung chuyển núi non Tetsuzankou (Thiết Sơn Kháo), chưởng pháp Zenei Enbu tạo ra ảo ảnh dồn ép đối thủ nghẹt thở.",
    rarity: "Huyền Thoại Bạch Hổ",
    element: "Bát Cực Quyền Pháp · Thiết Sơn Kháo Trực Xung"
  },
  {
    name: "Yang (The Blue Dragon of Hong Kong)",
    title: "Thanh Long Hồng Kông - Diệp Gia Lục Hợp Cước Điêu Luyện",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Metro City & Võ Sĩ Đường Phố Tự Do",
    image: "/assets/street-fighter/yang.webp",
    meaning: "Người em điềm tĩnh trong cặp song sinh hộ vệ khu phố Hồng Kông Lee Brothers, đồng môn của Yun. Tinh thông Lục Hợp Quyền với những đòn lướt nhanh xé gió Tourouzan, cước pháp Senkyutai sắc lẹm và phong thái đĩnh đạc của một bậc võ giả chân chính.",
    rarity: "Huyền Thoại Thanh Long",
    element: "Lục Hợp Quyền Pháp · Cước Ảnh Tourouzan"
  },
  {
    name: "Ibuki (The Glade Shinobi)",
    title: "Nữ Ninja Tinh Nghịch - Nhẫn Thuật Làng Gió Shinobi",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/ibuki.webp",
    meaning: "Nữ sinh trung học lớn lên trong ngôi làng ninja bí mật Glade ẩn sâu trong núi rừng Nhật Bản, luôn khao khát sống cuộc đời học trò bình thường. Bậc thầy phóng phi tiêu Kunai, kích nổ bom khói Horokudama và lướt đi bằng dù bay Raida vô cùng biến hóa.",
    rarity: "Huyền Thoại Nữ Nhẫn",
    element: "Phong Phi Tiêu Kunai · Nhẫn Thuật Lốc Xoáy"
  },
  {
    name: "Makoto (The Rindo-kan Karate Master)",
    title: "Nữ Võ Sư Karate Chân Truyền - Trụ Cột Võ Đường Rindo-kan",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/makoto.webp",
    meaning: "Nữ võ sĩ trẻ tuổi quyết tâm phục hưng võ đường Karate gia truyền Rindo-kan tại Tosa, Nhật Bản sau khi cha qua đời. Mang võ phục trắng với dải khăn quàng cổ màu vàng đặc trưng, thi triển những đòn Karate cương mãnh như Hayate lướt tới đấm gục đối thủ và đòn đấm ngũ đoạn Seichusen Godanzuki bẻ gãy mọi vật cản.",
    rarity: "Huyền Thoại Karate",
    element: "Cương Quyền Karate · Seichusen Godanzuki Bạo Kích"
  },
  {
    name: "Dudley (The Gentleman Boxer)",
    title: "Quý Ông Quyền Anh Nước Anh - Nắm Đấm Phong Cách Hoàng Gia",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/dudley.webp",
    meaning: "Võ sĩ quyền anh thượng lưu nước Anh với bộ ria mép lịch lãm, chiếc găng da quý tộc và niềm đam mê thưởng trà hoa hồng. Đấu pháp Boxing đỉnh cao không một động tác thừa, kết liễu trận đấu bằng cú đấm xuyên phá Corkscrew Blow cùng lời khen ngợi đậm chất quý tộc: 'Gutter trash!'.",
    rarity: "Huyền Thoại Quý Tộc",
    element: "Hoàng Gia Thiết Quyền · Corkscrew Blow Lịch Lãm"
  },
  {
    name: "Elena (The Spirit of the Savannah)",
    title: "Công Chúa Đồng Cỏ Châu Phi - Vũ Điệu Thiên Nhiên Capoeira",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/elena.webp",
    meaning: "Công chúa của một bộ tộc dũng mãnh tại Kenya, theo học tại Pháp với tâm hồn trong trẻo có thể lắng nghe tiếng thì thầm của gió và muôn loài. Sử dụng tuyệt đỉnh cước pháp Capoeira kết hợp vũ điệu nhào lộn Rhino Horn và khả năng tự hồi phục sinh lực Healing kỳ diệu từ đất mẹ.",
    rarity: "Huyền Thoại Vũ Linh",
    element: "Capoeira Thảo Nguyên · Sinh Lực Healing Thiên Nhiên"
  },
  {
    name: "Gill (The Divine Ruler)",
    title: "Đấng Tối Cao Hội Kín - Thần Vương Thao Túng Băng Hỏa Song Hành",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/gill.webp",
    meaning: "Vị thủ lĩnh tối cao của tổ chức cổ xưa Secret Society, sở hữu cơ thể phân đôi hoàn hảo giữa ngọn lửa rực cháy (Hỏa) và tảng băng vĩnh cửu (Băng). Bậc chân thần có khả năng thanh tẩy thế giới bằng Meteor Shower, Seraphic Wing rực rỡ và phép màu Hồi Sinh (Resurrection) bất tử.",
    rarity: "Chí Tôn Bán Thần",
    element: "Băng Hỏa Lưỡng Nghi · Seraphic Wing Thánh Quang"
  },
  {
    name: "Urien (The Treacherous Disciple)",
    title: "Phó Lãnh Tụ Secret Society - Bạo Chúa Kim Ngân Lôi Điện",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/urien.webp",
    meaning: "Em trai kiêm đối thủ truyền kiếp của thần vương Gill trong tổ chức Secret Society, luôn ôm mộng lật đổ anh trai để thống trị thiên hạ. Nắm giữ sức mạnh điều khiển kim loại và sấm sét, tạo nên bức tường gương phản chiếu ma thuật huyền thoại Aegis Reflector và đòn húc thiết đầu bạo tàn.",
    rarity: "Chí Tôn Lãnh Tụ",
    element: "Gương Phản Chiếu Aegis Reflector · Lôi Điện Thiết Giáp"
  },
  {
    name: "Karin Kanzuki (The Zaibatsu Heiress)",
    title: "Thiên Kim Tập Đoàn Kanzuki - Tuyệt Kỹ Võ Thuật Hoàng Tộc",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/karin-kanzuki.webp",
    meaning: "Đại tiểu thư thừa kế đế chế tài phiệt hùng mạnh bậc nhất thế giới Kanzuki Zaibatsu, mang phương châm sống 'Kẻ thắng có tất cả'. Bậc thầy môn võ gia truyền Kanzuki-ryu kết hợp đòn chưởng liên hoàn Kanzuki-ryu Kouhou Ken và điệu cười quý tộc 'Ohoho' đầy kiêu hãnh.",
    rarity: "Huyền Thoại Thiên Kim",
    element: "Kanzuki-ryu Tuyệt Kỹ · Hoàng Kim Gia Tộc"
  },
  {
    name: "R. Mika (Rainbow Mika)",
    title: "Nữ Đô Vật Cầu Vồng - Tinh Thần Nhiệt Huyết Nadeshiko",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/r-mika.webp",
    meaning: "Nữ đô vật biểu diễn người Nhật Bản luôn tràn đầy năng lượng tích cực, tôn sùng Zangief như thần tượng cả đời. Cùng người đồng đội tri kỷ Nadeshiko phối hợp những đòn vật phối hợp trên không Flying Peach, đập mông chấn động và đòn ném microphone sôi động.",
    rarity: "Huyền Thoại Nữ Đô Vật",
    element: "Cầu Vồng Biểu Diễn · Song Sát Nadeshiko"
  },
  {
    name: "Dee Jay (The Southern Battler)",
    title: "Vũ Công Kickboxing Jamaica - Giai Điệu Nhịp Thở Sôi Động",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/dee-jay.webp",
    meaning: "Ngôi sao âm nhạc tầm cỡ quốc tế kiêm nhà vô địch Kickboxing đến từ vùng biển Jamaica ngập tràn nắng gió. Đưa nhịp điệu Maracas và giai điệu Reggae vào từng cú đấm Air Slasher, đòn đá Sobat lả lướt cùng nụ cười tỏa sáng sưởi ấm mọi sàn đấu.",
    rarity: "Huyền Thoại Vũ Công",
    element: "Âm Nhạc Kickboxing · Air Slasher Tiết Tấu"
  },
  {
    name: "T. Hawk (Thunder Hawk)",
    title: "Chiến Thần Tộc Thunderfoot - Đại Bàng Bão Tố Bắc Mỹ",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/t-hawk.webp",
    meaning: "Dũng sĩ khổng lồ kiêu hãnh của bộ tộc da đỏ Thunderfoot Bắc Mỹ, người đứng lên bảo vệ đất mẹ thiêng liêng trước sự tàn phá của Shadaloo. Sở hữu sải tay vĩ đại như cánh đại bàng lướt gió Condor Dive và đòn vật xoay tít Mexican Typhoon nện đối thủ lún sàn đất.",
    rarity: "Huyền Thoại Dũng Sĩ",
    element: "Đại Bàng Bão Tố · Mexican Typhoon Uy Lực"
  },
  {
    name: "Rose (The Tarot Diviner of Venice)",
    title: "Bói Bài Thần Nữ Venice - Năng Lượng Thanh Tẩy Soul Power",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/rose.webp",
    meaning: "Nhà bói bài Tarot huyền bí cư ngụ tại thành phố sông nước Venice nước Ý, nắm giữ nửa thiện linh hồn gắn liền với M. Bison. Vận dụng năng lượng thuần khiết Soul Power qua chiếc khăn choàng tơ tằm Soul Spark và các lá bài định mệnh Tarot để thanh tẩy mọi ác niệm hắc ám.",
    rarity: "Chí Tôn Thần Nữ",
    element: "Linh Năng Soul Power · Bài Tarot Định Mệnh"
  },
  {
    name: "Menat (The Eyes of the Future)",
    title: "Chiêm Tinh Nữ Sư Ai Cập - Linh Châu Tiên Tri Thần Bí",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/menat.webp",
    meaning: "Nữ chiêm tinh gia trẻ tuổi đầy lém lỉnh người Ai Cập, đệ tử chân truyền duy nhất của bậc thầy Tarot Rose. Sử dụng quả cầu pha lê ma thuật Soul Power bay lượn trên không trung Soul Sphere để điều khiển không gian chiến đấu và tiên đoán tương lai.",
    rarity: "Truyền Thuyết Tiên Tri",
    element: "Linh Châu Soul Sphere · Bí Thuật Chiêm Tinh Ai Cập"
  },
  {
    name: "C. Viper (Crimson Viper - Maya)",
    title: "Đặc Vụ Ngầm Huyết Xà - Nữ Điệp Viên Công Nghệ Tối Tân",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Vệ Binh Công Lý & Đặc Nhiệm Interpol",
    image: "/assets/street-fighter/c-viper.webp",
    meaning: "Mật vụ cao cấp hai mang của cơ quan tình báo Mỹ giả trang thành nhân viên điều hành tập đoàn S.I.N. Trang bị bộ vest chiến đấu công nghệ cao kết hợp găng tay phóng điện Thunder Knuckle và bốt phản lực phóng lửa Burning Kick biến cô thành sát thủ công nghệ ảo diệu khó lường.",
    rarity: "Truyền Thuyết Điệp Viên",
    element: "Lôi Hỏa Song Hành · Phản Lực Burning Kick"
  },
  {
    name: "Abel (The Man with No Past)",
    title: "Chiến Binh Mất Trí Nhớ - Bậc Thầy Sambo Pháp Quốc",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/abel.webp",
    meaning: "Võ sĩ mang trong mình thể chất biến đổi nhân tạo thoát khỏi nanh vuốt Shadaloo nhưng mất đi toàn bộ ký ức. Tinh thông nghệ thuật Sambo và Judo cận chiến, lao vào quật ngã kẻ thù với đòn vật Tornado Throw và Wheel Kick đầy uy lực.",
    rarity: "Huyền Thoại Đấu Sĩ",
    element: "Nhu Đạo Sambo · Vòng Xoáy Tornado Throw"
  },
  {
    name: "Hakan (The Oil Wrestling Champion)",
    title: "Vua Đấu Vật Dầu Thổ Nhĩ Kỳ - Chủ Tịch Dầu Oliu Đệ Nhất",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/hakan.webp",
    meaning: "Nhà vô địch môn đấu vật dầu truyền thống Yağlı Güreş của Thổ Nhĩ Kỳ kiêm ông trùm sản xuất dầu oliu hàng đầu thế giới. Bằng cách thoa lớp dầu trơn bóng lên thân mình đỏ rực, hắn lướt đi trên sàn đấu với tốc độ đáng kinh ngạc và kẹp chặt đối thủ phóng văng vào không gian.",
    rarity: "Huyền Thoại Đô Vật",
    element: "Trơn Trượt Dầu Oliu · Yağlı Güreş Lốc Xoáy"
  },
  {
    name: "Laura Matsuda (The Matsuda Jiu-Jitsu Heiress)",
    title: "Nữ Đấu Sĩ Lôi Điện Brazil - Truyền Nhân Matsuda Jiu-Jitsu",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Đấu Sĩ Toàn Cầu & Bát Phương Quần Hùng",
    image: "/assets/street-fighter/laura-matsuda.webp",
    meaning: "Chị gái của Sean Matsuda và là người kế thừa đầy nhiệt huyết môn phái nhu thuật gia đình Matsuda Jiu-Jitsu tại Brazil. Kết hợp các đòn khóa siết Judo uyển chuyển với năng lượng điện giật sấm sét Matsuda Matsuda Thunder Clap nện tan nát mọi phòng ngự.",
    rarity: "Huyền Thoại Đấu Sĩ",
    element: "Lôi Điện Brazil · Matsuda Jiu-Jitsu Trảo Khóa"
  },
  {
    name: "Necalli (The Emissary of the Gods)",
    title: "Hung Thần Cổ Đại Aztec - Kẻ Nuốt Chửng Linh Hồn Võ Sĩ",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/necalli.webp",
    meaning: "Hiện thân của chiến tranh và tàn sát trong thần thoại Aztec cổ đại, thức tỉnh sau hàng thế kỷ say ngủ để săn lùng và nuốt chửng linh hồn của những chiến binh mạnh nhất cõi đời. Khi giải phóng phong ấn V-Trigger, mái tóc bùng cháy sắc đỏ rực rỡ và đòn cào xé dã man biến hắn thành ác quỷ cuồng nộ.",
    rarity: "Chí Tôn Hung Thần",
    element: "Cổ Thần Aztec · Nuốt Hồn Ma Lực Cuồng Bạo"
  },
  {
    name: "F.A.N.G (The Poisonous Grand Master)",
    title: "Độc Vương Shadaloo - Tứ Đại Thiên Vương Độc Dược",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Tổ Chức Shadaloo · Bóng Tối Psycho",
    image: "/assets/street-fighter/fang.webp",
    meaning: "Vị chỉ huy thứ hai trung thành tuyệt đối của M. Bison trong tổ chức Shadaloo, kẻ bị ám ảnh bởi số 2 và các loại độc tố cực mạnh. Khoác áo dài Trung Hoa bay bổng như hạc, phóng mây độc khí độc Sotoja và thi triển cước pháp lượn sóng khó lường làm đối thủ suy kiệt từ từ.",
    rarity: "Chí Tôn Độc Vương",
    element: "Kịch Độc Shadaloo · Vũ Điệu Hạc Độc Ám Khí"
  },
  {
    name: "G (President of the World)",
    title: "Tổng Thống Thế Giới - Đấng Hộ Mệnh Địa Cầu Gaia",
    category: "street_fighter",
    categoryLabel: "Street Fighter Huyền Thoại",
    faction: "Hội Kín Secret Society & Cổ Đại Thần Lực",
    image: "/assets/street-fighter/g.webp",
    meaning: "Nhân vật bí ẩn tự xưng là 'Tổng thống của toàn thể công dân Trái Đất', mang bản đồ thế giới vàng rực trên cơ thể. Khai thác sức mạnh magma ngầm và địa từ trường của mẹ Trái Đất Gaia, tung ra những cột lửa ngút trời G Burst và màn diễn thuyết truyền cảm hứng rung chuyển ngũ châu.",
    rarity: "Chí Tôn Thần Khí",
    element: "Địa Cầu Gaia · Magma Nham Thạch Khởi Nguyên"
  }
];

// Verify all images exist
const missingImages = [];
streetFighterCards.forEach(c => {
  const relPath = path.join('public', c.image);
  if (!fs.existsSync(relPath)) {
    missingImages.push(relPath);
  }
});

if (missingImages.length > 0) {
  console.error("Missing images:", missingImages);
  process.exit(1);
}

// Assign SF-01 to SF-52
const cardsWithIds = streetFighterCards.map((card, idx) => {
  const num = (idx + 1).toString().padStart(2, '0');
  return {
    id: `SF-${num}`,
    ...card
  };
});

// Write street_fighter.json
const sfFilePath = path.join('src', 'data', 'chibi', 'street_fighter.json');
fs.writeFileSync(sfFilePath, JSON.stringify(cardsWithIds, null, 2), 'utf-8');
console.log(`Created ${sfFilePath} with ${cardsWithIds.length} characters.`);

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
  'street_fighter'
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
