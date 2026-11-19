const fs = require('fs');
const path = require('path');

const hinduCharacters = [
  // Existing 12 characters (HD-01 to HD-12)
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
  },

  // 95 New Hindu Characters
  {
    name: "Shiva Nataraja (Lord of the Cosmic Dance)",
    title: "Vua Vũ Điệu Vũ Trụ - Nhịp Điệu Hủy Diệt & Sinh Thành Càn Khôn",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/shiva-nataraja.webp",
    meaning: "Hình tướng thần thánh của Shiva khi ngài thi triển vũ điệu vũ trụ Tandava trong vầng hào quang rực lửa. Chân phải ngài giẫm đạp lên quỷ lùn vô minh Apasmara, tay cầm ngọn lửa hủy diệt Agni và chiếc trống Damaru tạo nhịp sinh diệt của muôn trùng cõi giới.",
    rarity: "Chí Tôn Vũ Thần",
    element: "Vũ Điệu Tandava · Hào Quang Hỏa Luân"
  },
  {
    name: "Shiva Dakshinamurti (The Cosmic Guru of Silence)",
    title: "Đại Đạo Sư Hướng Nam - Khai Sáng Trí Huệ Bằng Tĩnh Lặng",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/shiva-dakshinamurti.webp",
    meaning: "Hóa thân tối cao của thần Shiva với tư cách là vị thầy đầu tiên của nhân loại quay mặt về phương Nam. Ngài tĩnh tọa dưới bóng cây đa bồ đề cổ thụ, khai mở mọi u tối vô minh cho các bậc hiền triết bằng sự tĩnh lặng tuyệt đối và ấn quyết Chin Mudra giác ngộ.",
    rarity: "Chí Tôn Đạo Sư",
    element: "Tĩnh Lặng Giác Ngộ · Chin Mudra Chân Lý"
  },
  {
    name: "Shiva Pashupati (Lord of All Animals & Nature)",
    title: "Chúa Tể Muôn Thú - Hiện Thân Yoga Cổ Đại Tự Nhiên",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/shiva-pashupati.webp",
    meaning: "Hình tướng nguyên thủy cổ xưa nhất của Shiva từ nền văn minh sông Ấn Indus, đấng bảo hộ và thống ngự muôn loài thú cùng muôn vàn sinh linh trong tự nhiên. Biểu trưng cho sự giải thoát mọi xiềng xích ràng buộc của thế tục để trở về với bản nguyên thanh tịnh.",
    rarity: "Chí Tôn Tự Nhiên Thần",
    element: "Pashupata Thần Uy · Muôn Loài Quy Phục"
  },
  {
    name: "Veerabhadra (The Fierce Wrath of Shiva)",
    title: "Chiến Thần Thịnh Nộ - Sấm Sét Hủy Diệt Buổi Tế Lễ Daksha",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/veerabhadra.webp",
    meaning: "Chiến binh siêu phàm sinh ra từ lọn tóc rực cháy đầy phẫn nộ của thần Shiva khi nàng Sati tuẫn tiết. Với tám cánh tay cầm gươm lửa, đinh ba, cung tên và khiên vàng, Veerabhadra dẫn đầu đạo quân Bhuta san phẳng buổi tế lễ ngạo mạn của vua Daksha.",
    rarity: "Chí Tôn Chiến Thần",
    element: "Cuồng Nộ Shiva · Thiết Kiếm Hỏa Diễm"
  },
  {
    name: "Kalabhairava (The Supreme Guardian of Time & Death)",
    title: "Chúa Tể Thời Gian & Tử Vong - Thần Hộ Trì Thánh Địa Kashi",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/kalabhairava.webp",
    meaning: "Hình tướng hung tợn tối thượng của Shiva ngự trị dòng chảy thời gian và tiêu trừ nỗi sợ hãi cái chết. Cưỡi trên hắc khuyển dũng mãnh, ngài cầm đinh ba và chiếc sọ đầu lâu, làm quan tòa phán xét linh hồn và bảo hộ tuyệt đối cho kinh thành thánh địa Varanasi.",
    rarity: "Chí Tôn Thời Không Thần",
    element: "Thời Gian Hắc Ám · Phán Xét Kashi"
  },
  {
    name: "Durga (The Invincible Goddess of War)",
    title: "Bất Bại Nữ Thần - Hộ Pháp Diệt Ma Vương Mahishasura",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/durga.webp",
    meaning: "Chiến thần tối cao của vũ trụ, hợp nhất toàn bộ linh lực và vũ khí của chư thiên. Ngài ngự trên lưng sư tử vàng oai phong, sở hữu mười cánh tay cầm đĩa luân, đinh ba, cung tên, trảm sát quỷ trâu Mahishasura giải thoát chư thiên khỏi ách thống trị tàn bạo.",
    rarity: "Chí Tôn Chiến Thần Nữ",
    element: "Thập Thủ Thần Binh · Sư Tử Hoàng Kim"
  },
  {
    name: "Kali (The Supreme Dark Mother & Goddess of Time)",
    title: "Đại Hắc Thần Nữ - Hiện Thân Thời Gian & Tiêu Diệt Ác Ma",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/kali.webp",
    meaning: "Nữ thần thịnh nộ tuyệt đối của sự hủy diệt bóng tối và giải thoát nghiệp lực. Làn da đen tuyền như bóng đêm vũ trụ, ngài nhảy múa vũ điệu cuồng nộ Maha Tandava, uống cạn máu quỷ ma Raktabija và thức tỉnh ý thức giác ngộ trên lồng ngực thần Shiva.",
    rarity: "Khởi Nguyên Hắc Ma Mẫu",
    element: "Maha Tandava · Trảm Ma Kiếm Huyết"
  },
  {
    name: "Chamunda (The Slayer of Chanda and Munda)",
    title: "Hộ Quốc Minh Vương Nữ - Trảm Sát Tướng Quỷ Chanda Munda",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/chamunda.webp",
    meaning: "Hóa thân chiến đấu hung mãnh bước ra từ vầng trán nhăn lại vì giận dữ của nữ thần Durga. Với đôi mắt đỏ rực như than hồng và tiếng thét làm rung chuyển chín tầng trời, ngài đã chém đầu hai tướng quỷ Chanda và Munda cứu vãn tam giới.",
    rarity: "Truyền Thuyết Hộ Thần",
    element: "Lôi Hỏa Minh Vương · Trảm Quỷ Uy Vũ"
  },
  {
    name: "Shailaputri (Daughter of the Mountains)",
    title: "Đệ Nhất Navadurga - Công Chúa Núi Tuyết Himavat",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/shailaputri.webp",
    meaning: "Hình tướng đầu tiên được tôn thờ trong chín đêm Navaratri, con gái của vua núi tuyết Himalaya. Ngài ngự trên bạch ngưu Nandi, tay phải cầm đinh ba Trishula và tay trái nâng đóa hoa sen hồng, biểu tượng cho sự kiên định bền vững và khởi đầu thiêng liêng.",
    rarity: "Huyền Thoại Mẫu Thần",
    element: "Tuyết Sơn Khởi Nguyên · Đinh Ba Nandi"
  },
  {
    name: "Brahmacharini (The Goddess of Penance & Devotion)",
    title: "Đệ Nhị Navadurga - Nữ Tu Khổ Hạnh Giác Ngộ Tuyệt Đối",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/brahmacharini.webp",
    meaning: "Hình tướng thứ hai của Navadurga hiện thân cho quá trình tu tập khổ hạnh gian lao của nàng Parvati nhằm chinh phục trái tim thần Shiva. Bước đi chân trần thanh cao, tay cầm chuỗi tràng hạt Japamala và bình Kamandalu, ban phát đức kiên nhẫn và lòng trung trinh.",
    rarity: "Huyền Thoại Mẫu Thần",
    element: "Khổ Hạnh Tịnh Tâm · Japamala Bất Diệt"
  },
  {
    name: "Chandraghanta (The Goddess of Courage & Grace)",
    title: "Đệ Tam Navadurga - Tiếng Chuông Trăng Khuyết Dẹp Trừ Quỷ Mị",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/chandraghanta.webp",
    meaning: "Hình tướng thứ ba trong Navadurga mang vầng trăng khuyết hình chuông trên vương miện rực rỡ. Cưỡi trên lưng mãnh hổ oai dũng, tiếng chuông thần của ngài ngân vang xua tan mọi tà ma quỷ quái, ban sự dũng cảm và thanh bình cho cõi lòng người sùng kính.",
    rarity: "Huyền Thoại Mẫu Thần",
    element: "Trăng Khuyết Kim Chuông · Mãnh Hổ Hộ Pháp"
  },
  {
    name: "Kushmanda (The Creator of the Universe)",
    title: "Đệ Tứ Navadurga - Nụ Cười Rực Rỡ Khởi Sinh Vũ Trụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/kushmanda.webp",
    meaning: "Hình tướng thứ tư của Navadurga, đấng tạo ra toàn bộ vũ trụ từ hư không chỉ bằng một nụ cười ấm áp ban mai. Ngài ngự bên trong vầng thái dương rực rỡ, tay cầm bình mật trường sinh Amrita và ban phát ánh sáng trí tuệ cho toàn cõi nhân gian.",
    rarity: "Chí Tôn Mẫu Thần",
    element: "Thái Dương Nụ Cười · Amrita Bất Tử"
  },
  {
    name: "Skandamata (Mother of Lord Skanda)",
    title: "Đệ Ngũ Navadurga - Người Mẹ Thánh Thiện Của Chiến Thần Kartikeya",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/skandamata.webp",
    meaning: "Hình tướng thứ năm của Navadurga bế người con trai sáu đầu Skanda (chiến thần Kartikeya) trên đùi. Ngự trên lưng sư tử dũng mãnh và ngồi trên đài hoa sen, ngài che chở và ban trí huệ vô song cho những người thành tâm cầu nguyện.",
    rarity: "Huyền Thoại Mẫu Thần",
    element: "Mẫu Tử Thiêng Liêng · Bạch Liên Tòa Sen"
  },
  {
    name: "Katyayani (The Fierce Slayer of Demons)",
    title: "Đệ Lục Navadurga - Nữ Chiến Thần Sinh Từ Lửa Thiêng Hiền Triết",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/katyayani.webp",
    meaning: "Hình tướng thứ sáu của Navadurga giáng trần làm con gái hiền triết Katyayana từ ngọn lửa thịnh nộ của tam vị thần Trimurti. Cầm thanh gươm sáng loáng Chandrahas, ngài xung trận chém đầu quỷ tướng Mahishasura lập lại trật tự cõi trời.",
    rarity: "Chí Tôn Mẫu Thần",
    element: "Chandrahas Thần Kiếm · Hào Quang Rực Cháy"
  },
  {
    name: "Kalaratri (The Fierce Destroyer of Darkness)",
    title: "Đệ Thất Navadurga - Đêm Đen Diệt Thế Tiêu Trừ Mọi Hiểm Nguy",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/kalaratri.webp",
    meaning: "Hình tướng thứ bảy của Navadurga mang sắc da đen thẳm như màn đêm vô tận, mái tóc xõa tung bay và con mắt thứ ba phát sáng rực rỡ. Cưỡi lừa thần, ngài tiêu diệt ác quỷ Raktabija và gieo rắc nỗi kinh hoàng cho kẻ ác nhưng ban ân vô lượng cho người thiện lương.",
    rarity: "Chí Tôn Mẫu Thần",
    element: "Màn Đêm Vô Tận · Sấm Sét Tiêu Ma"
  },
  {
    name: "Mahagauri (The Pure and Radiant Mother)",
    title: "Đệ Bát Navadurga - Ánh Trăng Rằm Thuần Khiết Gột Rửa Tội Lỗi",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/mahagauri.webp",
    meaning: "Hình tướng thứ tám của Navadurga sau khi được thần Shiva dùng nước sông Hằng gột rửa lớp da khổ hạnh, trở nên trắng sáng ngời ngợi như tuyết rơi và trăng rằm. Ngài ban phát sự an lạc, thanh lọc nghiệp chướng và chữa lành mọi đau khổ thế gian.",
    rarity: "Huyền Thoại Mẫu Thần",
    element: "Bạch Ngọc Thanh Tịnh · Sông Hằng Thanh Tẩy"
  },
  {
    name: "Siddhidatri (The Granter of All Mystic Powers)",
    title: "Đệ Cửu Navadurga - Đấng Ban Toàn Bộ Tám Phép Thần Thông Ashta Siddhi",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/siddhidatri.webp",
    meaning: "Hình tướng thứ chín tối cao của Navadurga, đấng nắm giữ và ban phát trọn vẹn tám đại thần thông Ashta Siddhi cùng chín kho báu Nidhi cho muôn loài. Ngay cả thần Shiva cũng thờ phụng ngài để đạt tới cảnh giới viên mãn Ardhanarishvara.",
    rarity: "Chí Tôn Mẫu Thần",
    element: "Bát Đại Thần Thông · Cát Tường Viên Mãn"
  },
  {
    name: "Tara Mahavidya (The Savior & Compassionate Mother)",
    title: "Đại Trí Tuệ Thần Nữ Tara - Bến Bờ Cứu Sinh Vượt Biển Luân Hồi",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/tara-mahavidya.webp",
    meaning: "Vị thứ hai trong Thập Đại Trí Tuệ Thần Nữ Mahavidya, người mẹ cứu độ chúng sinh vượt qua đại dương đau khổ Samsara. Mang sắc da xanh lam huyền bí, ngài nuốt trọn chất độc Halahala từ ngực thần Shiva để cứu sống ngài sau khi khuấy biển sữa.",
    rarity: "Chí Tôn Trí Tuệ Nữ Thần",
    element: "Halahala Cứu Thế · Thanh Lam Đại Nguyện"
  },
  {
    name: "Bagalamukhi (The Goddess of Paralyzing Power)",
    title: "Thần Nữ Hoàng Y Phục - Đóng Băng Khẩu Nghiệp & Tiêu Trừ Kẻ Thù",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/bagalamukhi.webp",
    meaning: "Vị thứ tám trong Mahavidya khoác áo cà sa màu vàng hoa cúc Pitambari rực rỡ. Ngài sở hữu năng lực Stambhana - đóng băng ý chí, phong tỏa lời nói và biến mọi mưu toan ám hại của quân thù trở nên vô hiệu trong nháy mắt.",
    rarity: "Truyền Thuyết Trí Tuệ Nữ Thần",
    element: "Hoàng Kim Stambhana · Phong Ấn Khẩu Thiệt"
  },
  {
    name: "Matangi (The Outcaste Goddess of Arts & Music)",
    title: "Thần Nữ Âm Nhạc Bí Truyền - Hiện Thân Phá Vỡ Mọi Rào Cản Định Kiến",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/matangi.webp",
    meaning: "Vị thứ chín trong Mahavidya, được mệnh danh là Saraswati của Mật tông tantra. Ngài gảy cây đàn Veena màu ngọc bích, bảo hộ những người nghèo khó bị gạt ra lề xã hội và ban phát sự thấu hiểu tuyệt đối về nghệ thuật và ngôn từ huyền bí.",
    rarity: "Truyền Thuyết Trí Tuệ Nữ Thần",
    element: "Phỉ Thúy Đàn Veena · Tiếng Hát Siêu Thoát"
  },
  {
    name: "Kamalatmika (The Lotus Goddess of Spiritual Fullness)",
    title: "Hồng Liên Thánh Nữ - Đỉnh Cao Thịnh Vượng & Ánh Sáng Tinh Khiết",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tối Cao Shakti & Cửu Thần Nữ Navadurga",
    image: "/assets/hindu/kamalatmika.webp",
    meaning: "Vị thứ mười trong Thập Đại Mahavidya, hiện thân Mật tông tối cao của nữ thần Lakshmi. Ngự trên đóa sen hồng ngọc nghìn cánh được bốn con voi trắng phun nước thần Amrita chúc phúc, ngài biểu trưng cho sự viên mãn tối thượng của tâm linh và phú quý.",
    rarity: "Chí Tôn Trí Tuệ Nữ Thần",
    element: "Bạch Tượng Tắm Rửa · Thiên Cánh Hồng Liên"
  },
  {
    name: "Ganesha (Vighnaharta - Lord of Beginnings & Wisdom)",
    title: "Đại Thánh Trí Tuệ Đầu Voi - Chúa Tể Dẹp Tan Mọi Trở Ngại",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/ganesha.webp",
    meaning: "Con trai tôn kính của thần Shiva và nữ thần Parvati, vị thần được thờ phụng đầu tiên trước mọi công việc trọng đại. Mang đầu voi uy nghiêm và chiếc bụng tròn nhân hậu, ngài cầm rìu thần dẹp chướng ngại, chiếc bánh ngọt Modaka ban phước lành và bẻ một chiếc ngà để chép thiên sử thi Mahabharata.",
    rarity: "Chí Tôn Phúc Thần",
    element: "Vighnaharta Trừ Chướng · Ngà Voi Kinh Sử"
  },
  {
    name: "Kartikeya (Murugan - Commander-in-Chief of the Gods)",
    title: "Chiến Thần Tối Cao - Đại Thống Lĩnh Thiên Binh Chư Thiên",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/kartikeya-murugan.webp",
    meaning: "Con trai trưởng dũng mãnh của Shiva và Parvati, được nuôi dưỡng bởi sáu ngôi sao Krittika (chòm sao Thất Nữ). Cưỡi trên con công kiêu hãnh Paravani, tay nắm ngọn giáo sấm sét Vel do Mẹ Parvati trao tặng, ngài quét sạch đại quân ác quỷ Surapadman bảo vệ tam giới.",
    rarity: "Chí Tôn Chiến Thần",
    element: "Ngọn Giáo Vel Thần · Khổng Tước Oai Linh"
  },
  {
    name: "Murugan (Lord Murugan of Palani)",
    title: "Chúa Tể Ngọn Đồi Thiêng - Đấng Giải Thoát Khỏi U Tối Vô Minh",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/murugan.webp",
    meaning: "Vị thần được tôn kính nhất vùng văn hóa Tamil miền Nam Ấn Độ, biểu tượng của tuổi trẻ vĩnh cửu, lòng quả cảm và tri thức ngôn ngữ thần thánh. Đứng trên đỉnh đồi Palani với ngọn giáo Vel rạng rỡ, ngài đập tan bản ngã kiêu ngạo để đưa con người tới ánh sáng chân lý.",
    rarity: "Chí Tôn Phúc Thần",
    element: "Ngọn Đồi Palani · Ánh Sáng Chân Lý Vel"
  },
  {
    name: "Nandi (The Sacred Bull & Gatekeeper of Mount Kailash)",
    title: "Bạch Ngưu Hộ Pháp - Vật Cưỡi Trung Kiên Của Thần Shiva",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/nandi.webp",
    meaning: "Chú bò trắng thần thánh, người gác cổng trung thành tối cao của đỉnh núi tuyết thiêng Kailash. Nandi là biểu tượng bất diệt của sự kiên nhẫn vô hạn, lòng sùng kính tận tụy và sức mạnh thể chất phi thường, luôn lắng nghe lời thỉnh cầu của chúng sinh để chuyển tới thần Shiva.",
    rarity: "Huyền Thoại Hộ Thần",
    element: "Bạch Ngưu Kiên Định · Trấn Giữ Kailash"
  },
  {
    name: "Garuda (The King of Birds & Mount of Lord Vishnu)",
    title: "Kim Sí Điểu Vương - Chúa Tể Muôn Loài Chim Vũ Trụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/garuda.webp",
    meaning: "Đại bàng thần mặt trời dũng mãnh, vật cưỡi trung thành của đấng bảo hộ Vishnu. Đôi cánh vàng rực rỡ che khuất cả bầu trời, tốc độ bay xé toạc không gian, Garuda là khắc tinh truyền kiếp của loài rắn độc Naga và kẻ đánh cắp nước thần Amrita để giải cứu mẹ.",
    rarity: "Chí Tôn Kim Thần Điểu",
    element: "Đôi Cánh Kim Quang · Khắc Tinh Xà Tộc"
  },
  {
    name: "Ananta Shesha (The Thousand-Headed Cosmic Serpent)",
    title: "Vua Rắn Vĩnh Cửu - Mãng Xà Nghìn Đầu Nâng Đỡ Vũ Trụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/ananta-shesha.webp",
    meaning: "Vua của loài rắn Naga, sinh vật bất tử nguyên thủy tồn tại vượt qua mọi chu kỳ hủy diệt của vũ trụ. Nghìn chiếc đầu tỏa sáng nâng đỡ các hành tinh càn khôn, cuộn tròn thân mình làm chiếc giường êm ái cho thần Vishnu say ngủ trên đại dương sữa nguyên thủy.",
    rarity: "Chí Tôn Linh Thần",
    element: "Nghìn Đầu Bất Tử · Nâng Đỡ Càn Khôn"
  },
  {
    name: "Airavata (The King-Elephant of the Heavens)",
    title: "Bạch Tượng Tứ Ngà - Vua Loài Voi Của Chúa Trời Indra",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/airavata.webp",
    meaning: "Voi thần trắng tinh khôi sinh ra từ đại dương sữa Samudra Manthan, sở hữu bốn ngà vàng và bảy chiếc vòi thần thánh. Là vật cưỡi của vua trời Indra, Airavata có khả năng hút nước từ cõi âm rồi phun lên bầu trời tạo thành những đám mây mưa sấm sét tưới mát cõi trần.",
    rarity: "Huyền Thoại Linh Thú",
    element: "Tứ Ngà Bạch Tượng · Mây Mưa Sấm Sét"
  },
  {
    name: "Kamadhenu (The Sacred Wish-Fulfilling Cow)",
    title: "Bò Mẫu Như Ý - Suối Nguồn Phúc Lộc & Lương Thực Vô Tận",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/kamadhenu.webp",
    meaning: "Con bò thần thánh thiêng liêng sinh ra từ cuộc khuấy biển sữa, mang trong mình toàn thể chư thiên vũ trụ. Đôi cánh công lộng lẫy và đôi sừng vàng ban phát sữa thần cùng mọi điều ước lương thực, châu báu cho những bậc đạo sư tu hành chân chính.",
    rarity: "Chí Tôn Linh Mẫu",
    element: "Như Ý Sữa Thần · Vạn Vật Sinh Sôi"
  },
  {
    name: "Mohini (The Enchantress Avatar of Vishnu)",
    title: "Tuyệt Sắc Ảo Ảnh - Nữ Hóa Thân Mê Hoặc Đoạt Nước Thần",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/mohini.webp",
    meaning: "Hóa thân nữ sắc duy nhất của thần Vishnu với vẻ đẹp khuynh thành làm say đắm cả chư thần lẫn ma quỷ. Bằng nụ cười quyến rũ và điệu múa mê hoặc, nàng đã lừa đoạt lại bình nước trường sinh Amrita từ tay quỷ Asura phân phát cho chư thiên.",
    rarity: "Chí Tôn Ảo Ảnh Thần",
    element: "Khuynh Thành Nhan Sắc · Đoạt Bình Amrita"
  },
  {
    name: "Dhanvantari (The Divine Physician of the Gods)",
    title: "Y Thần Vũ Trụ - Người Mang Bình Thuốc Trường Sinh Amrita",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/dhanvantari.webp",
    meaning: "Hóa thân của thần Vishnu xuất hiện từ biển sữa Samudra Manthan với bình nước trường sinh bất tử Amrita trên tay. Ngài là tổ sư sáng lập nền y học cổ truyền Ayurveda, truyền bá thuật thảo dược và giải trừ mọi dịch bệnh cho muôn loài.",
    rarity: "Huyền Thoại Y Thần",
    element: "Ayurveda Thánh Y · Nước Thần Amrita"
  },
  {
    name: "Hayagriva (The Horse-Headed God of Wisdom)",
    title: "Đầu Ngựa Minh Thần - Hộ Pháp Thu Hồi Bộ Tứ Kinh Veda",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/hayagriva.webp",
    meaning: "Hóa thân thân người đầu ngựa trắng sáng ngời của thần Vishnu, biểu tượng của tri thức tuyệt đối. Ngài đã xông xuống vực thẳm đại dương đánh bại ác quỷ Madhu và Kaitabha để đoạt lại bốn bộ kinh Veda bị đánh cắp trả về cho đấng sáng tạo Brahma.",
    rarity: "Chí Tôn Minh Thần",
    element: "Bạch Mã Trí Tuệ · Phục Hồi Kinh Veda"
  },
  {
    name: "Bala Krishna (The Divine Child of Gokula)",
    title: "Ấu Thần Gokula - Cậu Bé Tinh Nghịch Giữ Bình Bơ Thơm",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/bala-krishna.webp",
    meaning: "Hình tướng tuổi thơ đáng yêu vô ngần của Krishna tại làng chăn bò Gokula. Dù chỉ là một cậu bé hay ăn vụng bơ của mẹ Yashoda, ngài đã liên tục hàng phục các ác ma khổng lồ như Putana, Trinavarta và nhấc bổng ngọn núi Govardhan che chở xóm làng.",
    rarity: "Huyền Thoại Ấu Thần",
    element: "Viên Bơ Thơm Ngọt · Núi Govardhan Che Mưa"
  },
  {
    name: "Krishna (The Supreme Divine Lord & Guide)",
    title: "Chí Tôn Đạo Sư - Cây Sáo Trúc Bansuri & Khúc Ca Bhagavad Gita",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/krishna.webp",
    meaning: "Hóa thân thứ tám trọn vẹn nhất của đấng bảo hộ Vishnu, hiện thân của tình yêu, trí tuệ và công lý tối thượng. Tiếng sáo trúc Bansuri làm đắm say vạn vật, đĩa luân Sudarshana trừ gian diệt ác, và lời thuyết giảng Bhagavad Gita trên chiến trường Kurukshetra soi sáng tâm hồn nhân loại qua muôn đời.",
    rarity: "Chí Tôn Đại Đạo Sư",
    element: "Bansuri Sáo Trúc · Khúc Ca Bhagavad Gita"
  },
  {
    name: "Balarama (Lord of the Plow & Strength)",
    title: "Thần Cày Vàng - Chiến Tướng Đại Chùy Huynh Trưởng Krishna",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/balarama.webp",
    meaning: "Anh trai của Krishna, hiện thân giáng thế của vua rắn Shesha. Khoác áo choàng xanh thẫm Nilambara, vác trên vai chiếc cày vàng Hala dời non chuyển dòng sông Yamuna và nắm đại chùy Gada vô địch, là sư phụ dạy chùy cho cả Bhima lẫn Duryodhana.",
    rarity: "Chí Tôn Thần Tướng",
    element: "Hala Cày Vàng · Đại Chùy Dời Non"
  },
  {
    name: "Kalki (The Future Tenth Avatar on White Horse)",
    title: "Bạch Mã Chiến Thần - Kiếp Thứ Mười Diệt Mạt Pháp Kali Yuga",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/kalki.webp",
    meaning: "Hóa thân thứ mười của Vishnu sẽ xuất hiện vào thời điểm mạt vận suy đồi nhất của kỷ nguyên Kali Yuga. Ngài cưỡi trên chú ngựa trắng Devadatta có cánh, vung thanh gươm lửa sáng loáng thiêu rụi tà đạo bất công, khai mở kỷ nguyên vàng son Satya Yuga thanh khiết.",
    rarity: "Chí Tôn Cứu Thế Avatar",
    element: "Devadatta Bạch Mã · Kiếm Lửa Diệt Mạt Pháp"
  },
  {
    name: "Buddha (Avatar of Compassion & Enlightenment)",
    title: "Thế Tôn Giác Ngộ - Bát Chánh Đạo & Lòng Từ Bi Vô Lượng",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Thập Đại Avatar Dashavatara & Thần Tích",
    image: "/assets/hindu/buddha.webp",
    meaning: "Hóa thân thứ chín của thần Vishnu giáng sinh dưới cây bồ đề xứ Ấn để dạy chúng sinh từ bỏ hiến tế sát sinh, thực hành lòng từ bi bình đẳng muôn loài và chuyển hóa đau khổ qua Bát Chánh Đạo đạt tới cõi Niết Bàn an lạc.",
    rarity: "Chí Tôn Giác Ngộ Thần",
    element: "Bồ Đề Giác Ngộ · Từ Bi Vô Lượng"
  },
  {
    name: "Hanuman (The Immortal Vanara Hero & Devotee)",
    title: "Thần Khỉ Dũng Mãnh - Tinh Thần Tận Trung Bất Diệt Của Rama",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/hanuman.webp",
    meaning: "Con trai của thần gió Vayu, hóa thân của lòng quả cảm và trung thành tuyệt đối với hoàng tử Rama trong sử thi Ramayana. Sở hữu thân thể kim cang bất hoại, ngài bay qua đại dương tới Lanka, thiêu rụi kinh thành quỷ ma và nâng cả ngọn núi Dronagiri mang thảo dược cứu sống Lakshmana.",
    rarity: "Chí Tôn Thần Tướng",
    element: "Gió Vayu Kim Cang · Đại Chùy San Phẳng"
  },
  {
    name: "Sita (Janaki - The Embodiment of Virtue)",
    title: "Thánh Nữ Đất Mẹ - Nữ Hoàng Thủy Chung Sử Thi Ramayana",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/sita.webp",
    meaning: "Hoàng hậu đức hạnh của Rama, hiện thân của nữ thần Lakshmi sinh ra từ luống cày thiêng của vua Janaka. Trải qua gian khổ chốn rừng sâu và cảnh giam cầm dưới tay bạo chúa Ravana, lòng kiên trinh và đức độ cao quý của nàng mãi là biểu tượng bất diệt.",
    rarity: "Chí Tôn Thánh Nữ",
    element: "Đất Mẹ Thiêng Liêng · Tiết Hạnh Ngời Sáng"
  },
  {
    name: "Lakshmana (The Loyal Brother & Serpent Incarnation)",
    title: "Hiệp Sĩ Chí Tình - Thần Tiễn Trung Kiên Của Hoàng Tử Rama",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/lakshmana.webp",
    meaning: "Người em trai kiên trung gắn bó như hình với bóng của Rama, hiện thân giáng trần của rắn thần Shesha. Quyết định theo anh vào rừng lưu đày 14 năm, không chợp mắt suốt đêm trường để canh gác, dùng thần tiễn bắn chết đệ nhất dũng tướng quỷ Indrajit.",
    rarity: "Huyền Thoại Chiến Sĩ",
    element: "Cung Tên Trung Hiếu · Hộ Trì Huynh Trưởng"
  },
  {
    name: "Bharata (The Righteous Prince of Ayodhya)",
    title: "Nhiếp Chính Công Chính - Đôi Hài Vàng Thờ Kính Trên Ngai",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/bharata.webp",
    meaning: "Người em thứ hai của Rama, từ chối ngồi lên ngai vàng Ayodhya khi anh trai bị lưu đày oan ức. Ngài đặt đôi hài của Rama lên ngai để tôn thờ, mặc áo vỏ cây tu tập khổ hạnh ngoài thành và điều hành đất nước với tấm lòng thanh bạch hiếm có.",
    rarity: "Huyền Thoại Vương Tử",
    element: "Đôi Hài Vàng · Trị Quốc Thanh Liêm"
  },
  {
    name: "Shatrughna (The Slayer of Foes)",
    title: "Tiêu Diệt Quân Thù - Dũng Tướng Hộ Trì Vương Triều Ayodhya",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/shatrughna.webp",
    meaning: "Người em trai út dũng cảm của Rama, luôn sát cánh bảo bọc Bharata. Ngài đã dũng cảm xung phong tiêu diệt ác quỷ Lavanasura hung bạo bằng mũi tên thiêng của thần Vishnu, lập lại nền hòa bình cho vùng đồng bằng phì nhiêu Mathura.",
    rarity: "Huyền Thoại Chiến Tướng",
    element: "Thần Tiễn Trảm Ma · Hộ Vệ Hoàng Triều"
  },
  {
    name: "Sugriva (King of the Vanaras)",
    title: "Vua Loài Khỉ Vanara - Minh Ước Sắt Son Với Hoàng Tử Rama",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/sugriva.webp",
    meaning: "Vua của vương quốc khỉ Kishkindha, kết nghĩa đồng minh sống chết với Rama dưới ngọn lửa thiêng. Sugriva đã huy động hàng triệu chiến binh Vanara xây cầu đá Setubandhas băng qua đại dương tiến đánh sào huyệt Lanka cứu nàng Sita.",
    rarity: "Huyền Thoại Khỉ Vương",
    element: "Đại Quân Kishkindha · Minh Ước Lửa Thiêng"
  },
  {
    name: "Vali (The Invincible King of Kishkindha)",
    title: "Chiến Thần Tộc Khỉ - Thần Lực Hút Nửa Sức Mạnh Kẻ Thù",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/vali.webp",
    meaning: "Anh trai của Sugriva, con trai thần sấm Indra, sở hữu sức mạnh kinh hoàng và vòng cổ thần thoại giúp ngài tự động hấp thụ một nửa thể lực của bất kỳ đối thủ nào dám đứng đối diện, từng một mình quấn đuôi trói chặt bạo chúa Ravana.",
    rarity: "Chí Tôn Dũng Tướng",
    element: "Vòng Cổ Indra · Hấp Thụ Thể Lực"
  },
  {
    name: "Angada (The Steadfast Prince of Vanaras)",
    title: "Hoàng Tử Chân Thép - Vết Chân Không Ai Có Thể Lay Chuyển",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/angada.webp",
    meaning: "Con trai dũng cảm của vua khỉ Vali, đại sứ kiêu hãnh của Rama bước vào cung điện hoàng gia Lanka. Khi bị sỉ nhục, ngài thách thức cả triều đình Lanka nhấc được bàn chân ngài cắm trên sàn đá, khiến mọi tướng quỷ khiếp đảm nhận ra sức mạnh vô song.",
    rarity: "Huyền Thoại Dũng Tướng",
    element: "Chân Thép Bàn Thạch · Dũng Khí Vanara"
  },
  {
    name: "Jambavan (The Immortal King of Bears)",
    title: "Vua Gấu Cổ Đại - Bậc Cố Vấn Thông Thái Sử Thi Ramayana",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/jambavan.webp",
    meaning: "Vua của loài gấu Riksha sinh ra từ hơi thở của đấng sáng tạo Brahma, nhân chứng sống sống qua nhiều thời đại thần thoại. Ngài là người nhắc nhở và giải phóng thần lực bay lượn khổng lồ vốn bị lãng quên của Hanuman trước khi nhảy qua biển lớn.",
    rarity: "Huyền Thoại Gấu Vương",
    element: "Cổ Lão Hùng Thần · Khai Mở Thần Lực"
  },
  {
    name: "Jatayu (The Noble King of Vultures)",
    title: "Vua Kền Kền Anh Dũng - Liều Mình Quyết Tử Cứu Nàng Sita",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/jatayu.webp",
    meaning: "Vua chim đại bàng kền kền bạn thân của vua Dasaratha. Khi chứng kiến Ravana bắt cóc nàng Sita bay trên trời, dù già yếu ngài vẫn xông vào không chiến ác liệt, chấp nhận gãy cánh rụng lông để cầm chân bạo chúa và báo tin cho Rama trước khi trút hơi thở cuối.",
    rarity: "Huyền Thoại Liệt Sĩ",
    element: "Liều Thân Bầu Trời · Khí Phách Jatayu"
  },
  {
    name: "Sampati (The Brother of Jatayu)",
    title: "Đại Bàng Trụi Lông - Đôi Mắt Nhìn Thấu Ngàn Dặm Đại Dương",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/sampati.webp",
    meaning: "Anh trai của Jatayu, người đã xòe cánh che nắng mặt trời cho em trai đến mức đôi cánh cháy rụi phải sống cô độc trên núi đá. Với thị lực thần thánh nhìn thấu 100 dặm biển khơi, ngài đã chỉ đường chính xác vị trí nàng Sita bị giam cầm cho đoàn quân khỉ.",
    rarity: "Huyền Thoại Thần Điểu",
    element: "Thiên Lý Nhãn · Tình Huynh Đệ Vàng"
  },
  {
    name: "Shabari (The Embodiment of Simple Devotion)",
    title: "Nữ Cư Sĩ Rừng Sâu - Lòng Sùng Kính Thuần Khiết Nếm Từng Trái Ngọt",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/shabari.webp",
    meaning: "Nữ đệ tử già nua chân chất nơi rừng sâu chờ đợi Rama suốt cả cuộc đời. Để đón tiếp ngài, bà cẩn thận cắn thử từng quả dại trong rừng, chỉ giữ lại những quả ngọt lành nhất dâng lên Rama, được Rama cảm kích đón nhận như biểu tượng tối cao của lòng thành tín.",
    rarity: "Huyền Thoại Cư Sĩ",
    element: "Trái Ngọt Lòng Thành · Chân Tu Giác Ngộ"
  },
  {
    name: "Vibhishana (The Righteous King of Lanka)",
    title: "Hiền Đệ Công Chính - Bỏ Tà Quy Chánh Trở Thành Vua Lanka",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/vibhishana.webp",
    meaning: "Người em trai đạo hạnh của Ravana, kiên quyết phản đối việc bắt cóc nàng Sita. Dù bị anh trai xua đuổi, ngài vẫn quy thuận công lý của Rama, chỉ dẫn yếu huyệt của quân ma và được phong làm vua cai trị đảo Lanka hưng thịnh sau chiến tranh.",
    rarity: "Huyền Thoại Vương Giả",
    element: "Trượng Nghĩa Bất Khuất · Tân Vương Lanka"
  },
  {
    name: "Lava (The Valiant Twin Prince)",
    title: "Hoàng Tử Song Sinh Lửa - Thiện Xạ Trẻ Tuổi Đất Rừng Valmiki",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/lava.webp",
    meaning: "Con trai trưởng của hoàng tử Rama và nàng Sita sinh ra và lớn lên trong ẩn thất chốn rừng già của hiền triết Valmiki. Với tài bắn cung xuất quỷ nhập thần, cậu bé đã chặn đứng chiến mã hiến tế Ashwamedha và đánh bại những dũng tướng tinh nhuệ nhất triều đình Ayodhya.",
    rarity: "Huyền Thoại Vương Tử",
    element: "Thần Tiễn Rừng Xanh · Dòng Máu Mặt Trời"
  },
  {
    name: "Kusha (The Noble Twin Archer)",
    title: "Hoàng Tử Song Sinh Cỏ - Cây Đàn Veena & Cung Vàng Bách Thắng",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Ramayana & Thần Khỉ Huyền Thoại",
    image: "/assets/hindu/kusha.webp",
    meaning: "Người em sinh đôi của Lava, được hiền giả Valmiki dạy dỗ thi ca ca hát và võ nghệ thần thánh. Cùng anh trai gảy đàn Veena hát vang sử thi Ramayana làm rúng động cõi lòng vua Rama, chứng minh phẩm giá trong sáng ngời ngời của mẹ Sita.",
    rarity: "Huyền Thoại Vương Tử",
    element: "Khúc Ca Ramayana · Cung Vàng Bách Phát"
  },
  {
    name: "Arjuna (The Peerless Archer of Pandavas)",
    title: "Thiên Hạ Đệ Nhất Xạ Thủ - Người Tiếp Nhận Khúc Ca Bhagavad Gita",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/arjuna.webp",
    meaning: "Hoàng tử thứ ba của nhà Pandava, con trai thần sấm Indra, xạ thủ vĩ đại bậc nhất cõi trần với cây cung thần Gandiva. Được chính đấng Krishna làm người đánh xe và truyền thụ chân lý vũ trụ Bhagavad Gita, ngài là hạt nhân quyết định thắng lợi trong đại chiến Kurukshetra.",
    rarity: "Chí Tôn Xạ Thần",
    element: "Gandiva Thần Cung · Khai Ngộ Gita"
  },
  {
    name: "Karna (The Tragic Sun Hero of Charity)",
    title: "Chiến Thần Hào Hiệp - Con Của Thần Mặt Trời Với Giáp Vàng Bất Tử",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/karna.webp",
    meaning: "Con trai đầu lòng bi tráng của thần Mặt Trời Surya và nàng Kunti, sinh ra đã mang giáp vàng và khuyên tai bất tử Kavacha Kundala. Dù chịu số phận hắt hủi, lòng hào phóng vô bờ bến và lòng trung thành với bạn bè đưa Karna trở thành một trong những chiến binh vĩ đại nhất nhân loại.",
    rarity: "Chí Tôn Hào Hiệp",
    element: "Thái Dương Giáp Vàng · Vasavi Mũi Tên Diệt Thần"
  },
  {
    name: "Bhima (The Mighty Giant of Pandavas)",
    title: "Hộ Pháp Ngàn Voi - Đệ Nhị Pandava Với Cú Đập Đại Chùy Sấm Sét",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/bhima.webp",
    meaning: "Vị hoàng tử thứ hai nhà Pandava, con trai của thần gió Vayu, sở hữu sức mạnh bằng một vạn con voi chiến. Bậc thầy đánh chùy Gada vô địch, người đã đơn thương độc mã xé xác bạo chúa Jarasandha, diệt quỷ Kirmira và đập nát 100 hoàng tử ác ôn Kaurava để rửa nhục cho Draupadi.",
    rarity: "Chí Tôn Lực Sĩ",
    element: "Thần Gió Vayu · Đại Chùy Sấm Sét"
  },
  {
    name: "Yudhishthira (Dharmaraja - The King of Truth)",
    title: "Chúa Tể Công Lý - Vị Vua Cả Đời Chưa Từng Nói Dối",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/yudhishthira-dharmaraja.webp",
    meaning: "Hoàng tử trưởng nhà Pandava, con trai thần công lý Dharma, vị vua đức độ mẫu mực nhất lịch sử. Cỗ xe chiến của ngài luôn bay lơ lửng cách mặt đất một gang tay nhờ phẩm hạnh thanh tịnh, là người duy nhất đưa được cả thể xác lẫn tâm hồn bước thẳng lên cõi trời thiên đàng.",
    rarity: "Chí Tôn Pháp Vương",
    element: "Dharma Chân Lý · Cỗ Xe Bay Lơ Lửng"
  },
  {
    name: "Nakula (The Handsome Swordsman of Pandavas)",
    title: "Kiếm Khách Khôi Ngô - Bậc Thầy Cưỡi Ngựa Con Thần Ashvins",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/nakula.webp",
    meaning: "Hoàng tử thứ tư của ngũ tử Pandava, con trai của thần y song sinh Ashvins. Nổi tiếng với diện mạo khôi ngô tuấn tú bậc nhất tam giới, kiếm thuật lả lướt như gió thoảng và khả năng giao tiếp, chữa trị cho loài ngựa chiến phi phàm.",
    rarity: "Huyền Thoại Kiếm Khách",
    element: "Song Kiếm Lả Lướt · Chiến Mã Thần Tốc"
  },
  {
    name: "Sahadeva (The Wise Astrologer of Pandavas)",
    title: "Chiêm Tinh Thiên Tài - Bậc Tiên Tri Nhìn Thấu Mọi Vận Mệnh",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/sahadeva.webp",
    meaning: "Em út trong năm anh em Pandava, nhà chiêm tinh và triết gia lỗi lạc biết trước mọi kết cục của đại chiến Kurukshetra. Tay cầm chiếc búa rìu thần thánh, ngài đã hạ gục kẻ chủ mưu gian ác Shakuni để kết thúc cuộc chiến tương tàn.",
    rarity: "Huyền Thoại Tiên Tri",
    element: "Thiên Tinh Bí Thuật · Búa Rìu Phạt Tội"
  },
  {
    name: "Bhishma (The Grandfather & Iron Patriarch)",
    title: "Đại Lão Sư Tổ - Lời Thề Sắt Đá & Khả Năng Tự Định Đoạt Tử Kỳ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/bhishma.webp",
    meaning: "Cụ tổ tôn kính của cả hoàng tộc Kuru, con trai của thần sông Ganga. Mang lời thề từ bỏ ngai vàng và độc thân suốt đời (Bhishma Pratigya), ngài được ban ân huệ Ichha Mrityu (chỉ chết khi bản thân muốn). Nằm trên giường ngập ngụa tên nhọn, ngài bình thản truyền thụ đạo lý trị quốc cho đời sau.",
    rarity: "Chí Tôn Trưởng Lão",
    element: "Lời Thề Sắt Đá · Giường Tên Bất Diệt"
  },
  {
    name: "Dronacharya (The Royal Military Guru)",
    title: "Đại Sư Phụ Binh Pháp - Bậc Thầy Võ Học Hoàng Triều Kuru",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/dronacharya.webp",
    meaning: "Vị thầy võ thuật huyền thoại dạy dỗ toàn bộ hoàng tử Pandava và Kaurava. Nắm giữ kiến thức thâm sâu về mọi loại vũ khí hủy diệt thần thánh Astra và cách bố trí các trận đồ bát quái luân xa Chakravyuha bất khả xâm phạm.",
    rarity: "Chí Tôn Võ Sư",
    element: "Binh Pháp Hoàng Triều · Trận Đồ Chakravyuha"
  },
  {
    name: "Abhimanyu (The Fearless Young Warrior)",
    title: "Thiếu Niên Anh Kiệt - Phá Trận Đồ Luân Xa Chakravyuha",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/abhimanyu.webp",
    meaning: "Con trai 16 tuổi anh dũng của Arjuna và Subhadra, người học được cách phá trận đồ Chakravyuha từ trong bụng mẹ. Dù bị bảy đại tướng bao vây tước đoạt vũ khí, chàng vẫn dùng chiếc bánh xe ngựa chiến đấu kiên cường đến hơi thở cuối cùng làm rung động muôn đời.",
    rarity: "Huyền Thoại Liệt Sĩ",
    element: "Bánh Xe Ngựa Chiến · Phá Trận Luân Xa"
  },
  {
    name: "Ghatotkacha (The Giant Rakshasa Warrior)",
    title: "Dũng Sĩ Hộ Pháp Khổng Lồ - Cây Chùy Sấm Sét Đêm Đen Kurukshetra",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/ghatotkacha.webp",
    meaning: "Con trai nửa người nửa quỷ Rakshasa của hoàng tử Bhima và nàng Hidimbi. Trong đêm chiến định mệnh, ngài biến hóa khổng lồ giẫm nát quân thù và hy sinh thân mình gánh mũi tên thần diệt chủng Vasavi Shakti của Karna để bảo vệ an toàn cho Arjuna.",
    rarity: "Huyền Thoại Dũng Sĩ",
    element: "Ảo Thuật Dạ Chiến · Thân Thể Cự Nhân"
  },
  {
    name: "Draupadi (Panchali - Born from the Fire Altar)",
    title: "Hỏa Sinh Hoàng Hậu - Lòng Kiêu Hãnh & Phẩm Giá Ngời Sáng",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/draupadi-panchali.webp",
    meaning: "Mỹ nhân tuyệt sắc sinh ra từ ngọn lửa tế lễ Yajnaseni, hoàng hậu kiêu hãnh của ngũ tử Pandava. Được đấng Krishna ban tà áo vô tận che chở danh dự trước sự lăng nhục của quân thù, mái tóc xõa của nàng là ngọn đuốc mở màn cho cuộc thanh tẩy Kurukshetra.",
    rarity: "Chí Tôn Hoàng Hậu",
    element: "Lửa Tế Yajnaseni · Tà Áo Vô Tận Krishna"
  },
  {
    name: "Kunti (The Mother of Pandavas)",
    title: "Thái Hậu Đức Hạnh - Người Nắm Giữ Thần Chú Triệu Hồi Chư Thần",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/kunti.webp",
    meaning: "Người mẹ nhân từ và kiên cường của các hoàng tử Pandava. Nắm giữ câu thần chú bí mật của thánh Durvasa để triệu thỉnh chư thiên ban cho những đứa con phi thường, bà gánh chịu mọi nhọc nhằn và thử thách để bảo bọc các con bước lên đỉnh vinh quang.",
    rarity: "Huyền Thoại Quốc Mẫu",
    element: "Thần Chú Chư Thiên · Tình Mẫu Tử Bao La"
  },
  {
    name: "Subhadra (The Sister of Krishna & Mother of Abhimanyu)",
    title: "Hoàng Nữ Cao Quý - Ánh Cười Rạng Rỡ Gắn Kết Pandava & Yadava",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/subhadra.webp",
    meaning: "Em gái yêu quý của Krishna và Balarama, người vợ dũng cảm lái cỗ xe đưa Arjuna về kinh thành Dwarka. Nàng là người mẹ của người hùng Abhimanyu và là tổ mẫu của toàn bộ hoàng tộc nối ngôi sau cuộc chiến Kurukshetra, được thờ phụng tại đền Jagannath Puri.",
    rarity: "Huyền Thoại Vương Muội",
    element: "Hoàng Gia Yadava · Đền Thiêng Puri"
  },
  {
    name: "Khatu Shyam (Barbarika - The Master of Three Arrows)",
    title: "Chiến Thần Ba Mũi Tên - Dâng Đầu Cho Krishna Vì Đại Nghĩa",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/khatu-shyam-barbarika.webp",
    meaning: "Cháu nội của Bhima, người sở hữu ba mũi tên thần thánh có khả năng đánh dấu và tiêu diệt toàn bộ quân thù trong vài giây. Để đảm bảo cán cân công lý của Krishna, chàng tự nguyện chặt đầu hiến tế trước trận chiến, được Krishna phong làm vị thần Khatu Shyam ban phúc khắp trần gian.",
    rarity: "Chí Tôn Xạ Thần",
    element: "Tam Thần Tiễn Bất Bại · Hiến Tế Đầu Vàng"
  },
  {
    name: "Me Yashoda (The Loving Mother of Gokula)",
    title: "Mẫu Thân Hiền Từ - Người Nhìn Thấy Ngân Hà Trong Miệng Con",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/me-yashoda.webp",
    meaning: "Người mẹ nuôi vĩ đại của thần Krishna tại làng quê Gokula mộc mạc. Tình mẫu tử ấm áp của bà vượt qua mọi phép thuật thần thánh; khi mở miệng bắt quả tang cậu bé Krishna ăn đất, bà đã kinh ngạc nhìn thấy toàn thể vũ trụ, mặt trời và các dải ngân hà quay cuồng bên trong.",
    rarity: "Huyền Thoại Mẫu Thân",
    element: "Tình Mẹ Vô Biên · Vũ Trụ Trong Miệng Con"
  },
  {
    name: "Radha Rani (The Supreme Queen of Divine Love)",
    title: "Nữ Hoàng Tình Yêu Thiêng Liêng - Bản Thể Linh Hồn Của Krishna",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/radha-rani.webp",
    meaning: "Nữ thần tối cao của tình yêu chân thật và sự dâng hiến vô điều kiện trong truyền thống Vaishnava. Nàng là nửa phần linh hồn không thể tách rời của Krishna (Radha-Krishna), ngự trên đài sen thơm ngát tại rừng hoa Vrindavan ban an lạc vĩnh hằng cho mọi trái tim chân thành.",
    rarity: "Chí Tôn Tình Yêu Nữ Thần",
    element: "Vrindavan Hoa Mộng · Tình Yêu Vô Điều Kiện"
  },
  {
    name: "Satyabhama (The Queen Warrior of Dwarka)",
    title: "Nữ Chiến Binh Xứ Dwarka - Cùng Phu Quân Trảm Sát Quỷ Narakasura",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/satyabhama.webp",
    meaning: "Hoàng hậu xinh đẹp và dũng cảm thứ hai của Krishna, hiện thân của Nữ Thần Đất Mẹ Bhumi Devi. Nổi tiếng với cá tính quyết liệt, nàng đã đích thân cầm cung bắn tên cùng Krishna tiêu diệt bạo chúa Narakasura giải thoát hàng vạn dân lành.",
    rarity: "Huyền Thoại Chiến Hậu",
    element: "Cung Tên Diệt Quỷ · Cây Ước Parijata"
  },
  {
    name: "Sati (The Goddess of Marital Felicity)",
    title: "Tiên Nữ Tuẫn Tiết - Ngọn Lửa Thiêng Bảo Vệ Danh Dự Thần Shiva",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/sati.webp",
    meaning: "Người vợ đầu tiên của thần Shiva, con gái của vua Daksha. Khi cha mình sỉ nhục người chồng tôn kính tại lễ tế thần, nàng đã dùng ngọn lửa nội tâm Yoga Agni thiêu đốt bản thân để giữ trọn lòng trinh bạch, các mảnh thể xác rơi xuống cõi trần tạo thành 51 thánh địa Shakti Peethas thiêng liêng.",
    rarity: "Chí Tôn Thánh Thần Nữ",
    element: "Lửa Thiêng Yoga Agni · 51 Thánh Địa Peethas"
  },
  {
    name: "Ganga (The Heavenly River Goddess)",
    title: "Thánh Mẫu Sông Hằng - Dòng Nước Tinh Khiết Rửa Sạch Mọi Tội Lỗi",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/ganga.webp",
    meaning: "Nữ thần của con sông thiêng liêng nhất cõi Ấn Độ giáo. Xuất phát từ ngón chân đấng Vishnu và giáng trần qua búi tóc thần Shiva để giảm sức tàn phá dữ dội, dòng nước mát lành của Ganga gột rửa mọi uế tạp tội lỗi và dẫn đường linh hồn về chốn vĩnh hằng.",
    rarity: "Chí Tôn Thánh Thủy Nữ Thần",
    element: "Thủy Thần Sông Hằng · Dòng Nước Cứu Rỗi"
  },
  {
    name: "Annapurna (The Goddess of Nourishment & Food)",
    title: "Mẫu Thần Lương Thực - Ban Phát Hạt Cơm Vàng Cứu Đói Cõi Trần",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/annapurna.webp",
    meaning: "Hóa thân từ bi của nữ thần Parvati cai quản sự no ấm và lương thực cho toàn cõi càn khôn. Ngự tại thánh địa Varanasi, tay cầm chiếc muôi vàng xới cơm dâng lên thần Shiva trong hình hài người khất thực, ngài đảm bảo không một ai trên thế gian phải chịu cảnh đói nghèo.",
    rarity: "Chí Tôn Phúc Mẫu",
    element: "Muôi Vàng Lương Thực · No Ấm Toàn Cầu"
  },
  {
    name: "Meenakshi (The Fish-Eyed Warrior Queen)",
    title: "Nữ Hoàng Đôi Mắt Cá Tuyệt Sắc - Thánh Nữ Bất Bại Xứ Madurai",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/meenakshi.webp",
    meaning: "Hóa thân tái sinh của Parvati mang đôi mắt to tròn tuyệt mỹ như loài cá không bao giờ nhắm để che chở con cái. Là nữ hoàng chiến binh dũng mãnh thống nhất toàn bộ đất đai phương Nam trước khi sánh duyên cùng thần Shiva Sundareswarar tại ngôi đền tráng lệ Madurai.",
    rarity: "Chí Tôn Chiến Hoàng Nữ",
    element: "Mắt Cá Che Chở · Vương Triều Madurai"
  },
  {
    name: "Mariamman (The Mother Goddess of Rain & Healing)",
    title: "Mẫu Thần Trừ Bệnh Cổ Xưa - Mưa Nắng Tự Nhiên & Lá Neem Chữa Lành",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/mariamman.webp",
    meaning: "Vị nữ thần bảo hộ dân gian miền Nam Ấn Độ và cộng đồng Tamil toàn cầu. Ngài kiểm soát những cơn mưa mát lành dập tắt mùa hè oi ả, xua tan dịch bệnh đậu mùa và ban phát sự chữa lành kỳ diệu thông qua nhánh lá neem thanh khiết.",
    rarity: "Huyền Thoại Hộ Mẫu",
    element: "Mưa Rào Thanh Tẩy · Lá Neem Chữa Bệnh"
  },
  {
    name: "Bhumi Devi (Mother Earth - Goddess of the Soil)",
    title: "Đất Mẹ Thiêng Liêng - Lòng Bao Dung Nuôi Dưỡng Muôn Loài Sinh Linh",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Đại Nữ Thần Tridevi & Mẫu Thần Linh Ứng",
    image: "/assets/hindu/bhumi-devi.webp",
    meaning: "Nữ thần hiện thân cho Đất Mẹ vĩ đại nâng đỡ vạn vật nhân loại. Dù bị ác quỷ Hiranyaksha nhấn chìm xuống đáy biển sâu, ngài đã được lợn thần Varaha nhấc bổng trên chiếc ngà vàng cứu rỗi, tiếp tục sứ mệnh sinh sôi chở che không mệt mỏi.",
    rarity: "Chí Tôn Đất Mẹ",
    element: "Địa Linh Che Chở · Vạn Vật Nảy Mầm"
  },
  {
    name: "Kamadeva (The God of Love, Desire & Spring)",
    title: "Thần Tình Yêu & Sắc Dục - Cung Hoa Ngũ Sắc Đánh Thức Trái Tim",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/kamadeva.webp",
    meaning: "Vị thần tình ái điển trai cưỡi chú vẹt xanh lướt đi trong gió xuân. Tay cầm cây cung làm bằng thân mía ngọt ngào với dây cung bện từ đàn ong mật, bắn ra năm mũi tên hoa ngũ sắc có thể khơi dậy ngọn lửa tình si ngay cả trong cõi lòng tĩnh lặng của các bậc đại thánh.",
    rarity: "Huyền Thoại Tình Thần",
    element: "Cung Mía Ong Mật · Mũi Tên Hoa Ngũ Sắc"
  },
  {
    name: "Kubera (Lord of Wealth & Regent of the North)",
    title: "Chúa Tể Kho Báu Vũ Trụ - Thần Tài Ngự Trị Phương Bắc",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Dung Hợp Thần Thể & Hóa Thân Vĩ Đại",
    image: "/assets/hindu/kubera.webp",
    meaning: "Vua của loài Dạ Xoa Yaksha, vị thần cai quản toàn bộ vàng bạc châu báu chôn giấu trong lòng đất mẹ. Ngự tại kinh thành Alaka rực rỡ vàng ngọc trên dãy núi thiêng Himalaya, ngài là bằng hữu tâm giao của thần Shiva ban phát sự giàu có thịnh vượng.",
    rarity: "Chí Tôn Tài Thần",
    element: "Kho Vàng Alaka · Châu Báu Lòng Đất"
  },
  {
    name: "Narada (The Wandering Celestial Sage)",
    title: "Đại Đạo Sư Lãng Du - Tiếng Đàn Tambura Ca Ngợi Danh Hiệu Narayana",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/narada.webp",
    meaning: "Đại hiền triết du hành tự do giữa ba cõi trời đất với cây đàn Tambura và cặp phách Khartal trên tay. Luôn miệng ca vang thánh hiệu 'Narayana! Narayana!', ngài xuất hiện ở mọi bước ngoặt lịch sử thần thoại để thúc đẩy định mệnh an bài của chư thiên và nhân gian.",
    rarity: "Chí Tôn Đại Sư",
    element: "Đàn Tambura Thần Thoại · Thánh Hiệu Narayana"
  },
  {
    name: "Veda Vyasa (The Compiler of the Vedas)",
    title: "Đại Thánh Biên Soạn Veda - Tác Giả Bộ Sử Thi Vĩ Đại Mahabharata",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/veda-vyasa.webp",
    meaning: "Bậc thầy vĩ đại đã phân chia kho tàng tri thức thiêng liêng thành bốn bộ kinh Veda, tác giả của bộ sử thi đồ sộ Mahabharata và 18 bộ Puranas cổ xưa. Với ngòi bút do chính thần Ganesha hỗ trợ chép lại, ngài lưu giữ toàn bộ kho tàng trí tuệ tâm linh cho hậu thế.",
    rarity: "Chí Tôn Khởi Nguyên Sư",
    element: "Tứ Bộ Kinh Veda · Bút Ký Mahabharata"
  },
  {
    name: "Valmiki (The First Poet Adi Kavi)",
    title: "Khởi Nguyên Thi Hào - Tác Giả Bản Trường Ca Ramayana Bất Hủ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/valmiki.webp",
    meaning: "Vị thi sĩ đầu tiên (Adi Kavi) của nền văn học Ấn Độ, người sáng tạo ra thể thơ thiêng Sloka từ nỗi đau xót trước đôi chim trúng tên. Người thầy chở che mẹ con nàng Sita và nuôi dạy hai hoàng tử Lava - Kusha trở thành những người anh hùng kiệt xuất.",
    rarity: "Chí Tôn Thi Thánh",
    element: "Vần Thơ Sloka Thiêng · Khởi Sinh Ramayana"
  },
  {
    name: "Patanjali (The Father of Modern Yoga)",
    title: "Tổ Sư Thiền Định Yoga - Tác Giả Bộ Kinh Điển Yoga Sutras",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/patanjali.webp",
    meaning: "Hóa thân giáng thế của mãng xà nghìn đầu Shesha, đấng sáng lập và hệ thống hóa toàn bộ nghệ thuật tu luyện thể xác và tâm trí qua bộ kinh văn kinh điển Yoga Sutras, giúp con người kiểm soát giác quan và đạt tới giải thoát tự tại Samadhi.",
    rarity: "Chí Tôn Yoga Đạo Sư",
    element: "Kinh Điển Yoga Sutras · Giác Ngộ Samadhi"
  },
  {
    name: "Agastya (The Great Sage Who Drank the Ocean)",
    title: "Đại Thánh Uống Cạn Đại Dương - Tổ Sư Văn Hóa Tamil Miền Nam",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/agastya.webp",
    meaning: "Một trong Thất Hiền Saptarishi vĩ đại nhất, người từng uống trọn toàn bộ nước của đại dương trong lòng bàn tay để chư thần tiêu diệt quỷ Asura trốn dưới đáy biển. Ngài đã truyền thụ bài kinh thần thánh Aditya Hridaya cho Rama trước trận quyết chiến với Ravana.",
    rarity: "Chí Tôn Thất Hiền Sư",
    element: "Uống Cạn Biển Lớn · Aditya Hridaya Thái Dương"
  },
  {
    name: "Vasishtha (The Chief of the Seven Sages)",
    title: "Thủ Lĩnh Thất Hiền Saptarishi - Quốc Sư Hoàng Triều Thái Dương Raghu",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/vasishtha.webp",
    meaning: "Đại hiền triết tâm linh đứng đầu Thất Hiền, người sở hữu bò thần Kamadhenu và cây gậy trí tuệ Brahmadanda bẻ gãy mọi vũ khí trần tục. Là quốc sư thông thái chỉ dạy đạo lý làm người cho hoàng tử Rama qua pho sách kinh điển Yoga Vasistha.",
    rarity: "Chí Tôn Thất Hiền Sư",
    element: "Brahmadanda Trí Tuệ · Quốc Sư Triều Raghu"
  },
  {
    name: "Vishwamitra (The Warrior King Turned Brahmarshi)",
    title: "Đại Thánh Sáng Tạo Gayatri Mantra - Chiến Vương Khổ Tu Thành Phật",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/vishwamitra.webp",
    meaning: "Từng là vị vua chiến binh dũng mãnh, ngài đã từ bỏ ngai vàng để trải qua muôn vàn kiếp khổ hạnh phi thường đạt tới danh hiệu tối cao Brahmarshi. Là người sáng tạo ra bài kinh thiêng liêng nhất Gayatri Mantra và truyền thụ các thần khí Astra cho hoàng tử Rama.",
    rarity: "Chí Tôn Đại Thánh",
    element: "Gayatri Mantra Bất Hủ · Astra Thần Khí"
  },
  {
    name: "Ravana (The Ten-Headed Demon King of Lanka)",
    title: "Ma Vương Mười Đầu Thành Lanka - Hùng Bá Tam Giới Bị Dục Vọng Hủy Diệt",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/ravana.webp",
    meaning: "Bạo chúa mười đầu uy quyền cai trị đảo vàng Lanka trong sử thi Ramayana. Vừa là học giả uyên bác tinh thông kinh Veda và bậc thầy đàn Veena sùng bái thần Shiva, vừa bị lòng kiêu ngạo và dục vọng che mắt khi bắt cóc nàng Sita dẫn đến hồi kết bi thảm dưới mũi tên của Rama.",
    rarity: "Chí Tôn Ma Vương",
    element: "Thập Thủ Ma Uy · Shiva Tandava Stotra"
  },
  {
    name: "Indrajit (Meghanada - The Conqueror of Indra)",
    title: "Chiến Thần Đánh Bại Vua Trời - Sở Hữu Ba Đại Thần Khí Tối Cao",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/indrajit-meghanada.webp",
    meaning: "Con trai thiên tài của Ravana với tiếng gầm rung chuyển mây trời lúc mới sinh (Meghanada). Là chiến binh duy nhất trong thần thoại sở hữu cả ba vũ khí hủy diệt tối thượng Brahmanda, Vaishnava và Pashupata, cùng thuật tàng hình chiến đấu từ các đám mây ảo diệu.",
    rarity: "Chí Tôn Ma Tướng",
    element: "Tam Đại Astra Diệt Thế · Tàng Hình Mây Sấm"
  },
  {
    name: "Kumbhakarna (The Sleeping Giant of Lanka)",
    title: "Khổng Lồ Ngủ Say Sáu Tháng - Cơn Ác Mộng Càn Quét Chiến Trường",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/kumbhakarna.webp",
    meaning: "Người em trai khổng lồ trung nghĩa của Ravana. Vì lời thề nguyền của thần Brahma, ngài phải ngủ say suốt sáu tháng và chỉ thức dậy ăn uống một ngày. Dù biết anh trai sai trái, ngài vẫn dũng cảm vác giáo xông pha trận mạc để bảo vệ dòng tộc đến hơi thở cuối cùng.",
    rarity: "Huyền Thoại Ma Tướng",
    element: "Khổng Thân Hộ Pháp · Giác Ngộ Trận Tiền"
  },
  {
    name: "Mahishasura (The Buffalo Demon King)",
    title: "Ma Vương Quỷ Trâu - Ân Huệ Bất Tử Làm Nghiêng Ngả Chư Thiên",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/mahishasura.webp",
    meaning: "Chúa tể loài quỷ Asura mang nửa người nửa trâu, đạt được ân huệ không một người đàn ông hay vị thần nam tính nào có thể giết chết. Sau khi chiếm lĩnh thiên đàng xua đuổi vua trời Indra, hắn cuối cùng bị chiến thần nữ tối cao Durga trảm sát dưới mũi đinh ba.",
    rarity: "Chí Tôn Ma Vương",
    element: "Thiết Giác Trâu Điên · Đảo Lộn Tam Giới"
  },
  {
    name: "Hiranyakashipu (The Demon King of Invulnerability)",
    title: "Bạo Chúa Bất Tử Tuyệt Đối - Kẻ Bị Xé Xác Bởi Hóa Thân Narasimha",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/hiranyakashipu.webp",
    meaning: "Đại ma đầu sở hữu lời ước bất tử không thể bị giết bởi người hay thú, bên trong hay ngoài nhà, ban ngày hay ban đêm. Sau chuỗi ngày bức hại người con trai hiền lương Prahlada, hắn bị hóa thân nửa người nửa sư tử Narasimha xé toạc bụng nơi ngưỡng cửa lúc hoàng hôn.",
    rarity: "Chí Tôn Ma Vương",
    element: "Bất Tử Ma Huyễn · Ngưỡng Cửa Hoàng Hôn"
  },
  {
    name: "Hiranyaksha (The Golden-Eyed Demon)",
    title: "Kim Nhãn Ma Vương - Kẻ Dìm Đất Mẹ Xuống Vực Thẳm Đại Dương",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/hiranyaksha.webp",
    meaning: "Người anh trai mắt vàng hung tợn của Hiranyakashipu, đã dùng sức mạnh tà đạo đánh cắp toàn bộ Đất Mẹ Bhumi Devi giấu xuống đáy đại dương nguyên thủy tăm tối, cuối cùng bị hóa thân lợn rừng khổng lồ Varaha húc văng và tiêu diệt.",
    rarity: "Huyền Thoại Ma Vương",
    element: "Kim Nhãn Hắc Ám · Vực Thẳm Đại Dương"
  },
  {
    name: "Narakasura (The Demon King of Pragjyotisha)",
    title: "Bạo Chúa Thành Hắc Ám - Kẻ Bắt Giữ Mười Sáu Nghìn Công Chúa",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/narakasura.webp",
    meaning: "Ác ma sinh ra từ lòng đất nhưng bị quyền lực làm tha hóa, cướp khuyên tai của mẹ chư thiên Aditi và giam giữ 16.000 nàng công chúa. Ngày hắn bị Krishna và Satyabhama tiêu diệt được toàn cõi nhân gian thắp đèn ăn mừng biến thành lễ hội ánh sáng Diwali rực rỡ.",
    rarity: "Huyền Thoại Ma Vương",
    element: "Hắc Ám Sào Huyệt · Khởi Nguồn Lễ Hội Diwali"
  },
  {
    name: "Tarakasura (The Asura of Great Boons)",
    title: "Đại Ma Vương Núi Đá - Ân Huệ Bất Tử Trước Toàn Cõi Chư Thần",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/tarakasura.webp",
    meaning: "Ma vương đạt được ân huệ phi thường chỉ có thể bị đánh bại bởi một đứa trẻ sơ sinh bảy ngày tuổi con trai của thần Shiva. Chính vì sự thống trị tàn bạo của hắn mà chư thần đã vun đắp cuộc hôn nhân giữa Shiva và Parvati để sinh ra chiến thần Kartikeya tiêu diệt hắn.",
    rarity: "Huyền Thoại Ma Vương",
    element: "Ma Thể Bất Xâm · Lời Nguyền Sơ Sinh"
  },
  {
    name: "Bhasmasura (The Ash Demon)",
    title: "Ác Quỷ Hóa Tro Tàn - Ân Huệ Chạm Tay Bị Hóa Giải Bởi Nàng Mohini",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/bhasmasura.webp",
    meaning: "Con quỷ được thần Shiva ban cho phép lạ hễ chạm tay lên đầu bất cứ ai thì kẻ đó lập tức biến thành đống tro tàn. Khi hắn toan phản bội đuổi theo Shiva, đấng Vishnu đã hóa thân thành mỹ nữ tuyệt sắc Mohini lừa hắn nhảy theo điệu múa tự đặt tay lên đầu mình tự thiêu rụi.",
    rarity: "Huyền Thoại Dị Ma",
    element: "Bàn Tay Hóa Tro · Mê Hồn Điệu Múa"
  },
  {
    name: "Kamsa (The Tyrant King of Mathura)",
    title: "Bạo Vương Thành Mathura - Kẻ Run Sợ Trước Lời Tiên Tri Về Krishna",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/kamsa.webp",
    meaning: "Vị vua bạo ngược chiếm ngai vàng Mathura, bị ám ảnh kinh hoàng bởi lời sấm truyền rằng đứa con thứ tám của em gái Devaki sẽ kết liễu đời hắn. Sau bao mưu toan ám hại ấu chúa thất bại, Kamsa cuối cùng bị chàng thiếu niên Krishna trừng phạt thích đáng ngay trên đấu trường.",
    rarity: "Huyền Thoại Bạo Chúa",
    element: "Bạo Tàn Ngai Vàng · Sấm Truyền Mathura"
  },
  {
    name: "Raktabija (The Demon of Multiplying Blood)",
    title: "Huyết Ma Tái Sinh - Giọt Máu Rơi Xuống Đất Nhân Bản Vô Hạn",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/raktabija.webp",
    meaning: "Ác quỷ đáng sợ bậc nhất thần thoại mang thần chú khiến mỗi giọt máu nhỏ xuống mặt đất lập tức mọc lên một bản sao quỷ mới với sức mạnh nguyên vẹn. Hắn đã khiến toàn bộ đạo quân chư thần bất lực trước khi nữ thần Kali xuất hiện uống cạn từng giọt máu trước khi chạm đất.",
    rarity: "Truyền Thuyết Huyết Ma",
    element: "Huyết Ma Nhân Bản · Tái Sinh Vô Tận"
  },
  // 25 New Characters (HD-108 to HD-132)
  {
    name: "Indra (King of the Gods & Lord of Svarga)",
    title: "Thiên Đế Indra - Vua Chư Thiên & Chúa Tể Sấm Sét Svarga",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/indra.webp",
    meaning: "Chúa tể ngự trị thiên giới Svarga, vua của muôn vàn chư thiên Devas và biểu tượng quyền năng của sấm sét, mưa giông và bão tố. Cầm trên tay thần khí sấm sét Kim Cang Chùy (Vajra) bất khả chiến bại, ngự trên lưng bạch tượng vĩ đại bốn ngà Airavata, từng chém đầu mãng xà Vritra giải phóng nguồn nước màu mỡ hồi sinh toàn cõi nhân gian.",
    rarity: "Chí Tôn Thiên Đế",
    element: "Kim Cang Vajra · Bạch Tượng Airavata"
  },
  {
    name: "Yama (Dharmaraja - God of Death & Justice)",
    title: "Minh Vương Dharmaraja - Chúa Tể Cõi Chết & Thẩm Phán Nhân Quả",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/yama.webp",
    meaning: "Vị thần tối cao cai quản cõi âm Naraka và hiện thân thiêng liêng của công lý, lẽ phải và luật nhân quả bất diệt (Dharma). Ngự trên lưng trâu rừng dũng mãnh, tay cầm dây thòng lọng Pasa trói buộc linh hồn và quyền trượng Danda phán xét, ngài công tâm định đoạt luân hồi nghiệp báo của mọi sinh linh không thiên vị bất kỳ ai.",
    rarity: "Chí Tôn Minh Vương",
    element: "Pháp Tắc Dharma · Thòng Lọng Pasa Định Nghiệp"
  },
  {
    name: "Agni (God of Sacred Fire & Divine Messenger)",
    title: "Hỏa Thần Agni - Ngọn Lửa Thiêng Cúng Tế & Sứ Giả Thiên Giới",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/agni.webp",
    meaning: "Hiện thân tối cao của ngọn lửa thiêng cúng tế Yajna, vị thần cầu nối trung gian đưa lời nguyện ước và lễ vật từ nhân gian lên chư thiên cõi trời. Sở hữu hai gương mặt rực lửa, bảy ngọn lửa lưỡi thần và cưỡi trên lưng chú cừu đực thần tốc, Agni thiêu rụi mọi u ám, thanh tẩy tà ma và thắp sáng sự sống vĩnh hằng.",
    rarity: "Chí Tôn Hỏa Thần",
    element: "Tam Muội Chân Hỏa · Ngọn Lửa Thiêng Yajna"
  },
  {
    name: "Varuna (God of Oceans & Universal Order)",
    title: "Hải Vương Thủy Thần - Chúa Tể Đại Dương & Trật Tự Vũ Trụ Rita",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/varuna.webp",
    meaning: "Đại thần cổ xưa cai quản toàn bộ vùng nước, biển cả đại dương bao la và người gìn giữ trật tự đạo đức vũ trụ nguyên thủy (Rita). Cầm trong tay sợi dây thòng lọng thần Naga-pasa bắt giữ kẻ dối trá, ngự trên thủy quái Makara lướt qua muôn trùng sóng dữ, Varuna nắm giữ chìa khóa của sự thật và nguồn nước bất tận nuôi sống vạn vật.",
    rarity: "Chí Tôn Hải Thần",
    element: "Hải Giới Thao Thiết · Trật Tự Vũ Trụ Rita"
  },
  {
    name: "Vayu (Pavana - God of the Wind & Prana)",
    title: "Phong Thần Vayu - Chúa Tể Cuồng Phong & Sinh Khí Vũ Trụ Prana",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/vayu.webp",
    meaning: "Vị thần của những luồng gió bão ngút trời và hiện thân của hơi thở dưỡng khí (Prana) duy trì sự sống cho muôn loài trong toàn vũ trụ. Cưỡi trên cỗ xe kéo bởi hàng ngàn linh dương trắng thần tốc, Vayu chính là người cha thần thánh ban tặng thần lực vô địch cho chiến thần Hanuman và người khổng lồ dũng mãnh Bhima.",
    rarity: "Chí Tôn Phong Thần",
    element: "Vô Ảnh Thần Phong · Sinh Khí Prana Vũ Trụ"
  },
  {
    name: "Surya (The Sun God & Bringer of Light)",
    title: "Thái Dương Thần Surya - Cội Nguồn Ánh Sáng & Sự Sống Toàn Năng",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/surya.webp",
    meaning: "Vị thần mặt trời vĩ đại xua tan màn đêm vô minh, ban phát hơi ấm và ánh quang rực rỡ nuôi dưỡng muôn loài vạn vật khắp tam giới. Ngự trên cỗ chiến xa vàng kim chói lọi kéo bởi bảy tuấn mã thần tượng trưng cho bảy sắc cầu vồng, Surya là người cha của chiến binh bất tử Karna và vua khỉ dũng cảm Sugriva.",
    rarity: "Chí Tôn Thái Dương Thần",
    element: "Thái Dương Kim Quang · Thất Mã Thần Xa"
  },
  {
    name: "Chandra (Soma - God of the Moon & Night)",
    title: "Nguyệt Thần Chandra - Chúa Tể Ánh Trăng Dịu Mát & Thần Dược Soma",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/chandra.webp",
    meaning: "Vị thần trăng thanh nhã và xinh đẹp ngự trị bầu trời đêm, người nắm giữ dòng chảy thần dược trường sinh Soma nuôi dưỡng tâm hồn và thảo mộc nhân gian. Lướt qua ngàn mây trên cỗ xe kéo bởi mười bạch mã thuần khiết, ánh sáng bạc dịu êm của Chandra xoa dịu mọi nỗi đau thương và thắp sáng niềm hy vọng trong đêm trường tăm tối.",
    rarity: "Chí Tôn Nguyệt Thần",
    element: "Thanh Lương Nguyệt Quang · Linh Dược Trường Sinh Soma"
  },
  {
    name: "Budha (God of Mercury, Intellect & Speech)",
    title: "Thủy Tinh Thần Budha - Chúa Tể Trí Tuệ, Hùng Biện & Mậu Dịch",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/budha.webp",
    meaning: "Tinh tú Sao Thủy trong hệ Cửu Diệu Navagraha, con trai của Nguyệt Thần Chandra và nàng Tara, đại diện cho trí tuệ sắc bén, khả năng hùng biện xuất chúng, học thuật và tài hoa buôn bán. Ngài mang bộ giáp vàng xanh ngọc, ngự trên lưng sư tử có cánh hoặc cỗ xe kéo bởi tám chiến mã, ban phát sự thông tuệ và minh mẫn cho người trần thế.",
    rarity: "Cửu Diệu Tinh Quân",
    element: "Thủy Tinh Linh Trí · Diệu Khẩu Hùng Biện"
  },
  {
    name: "Mangala (Angaraka - God of Mars & Valour)",
    title: "Hỏa Tinh Thần Mangala - Hiện Thân Năng Lượng Chiến Binh Đỏ Rực",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/mangala.webp",
    meaning: "Vị thần cai quản Sao Hỏa trong Navagraha, sinh ra từ giọt mồ hôi đỏ rực của thần Shiva rơi xuống vòng tay Mẹ Đất Bhumi. Mang sắc đỏ rực lửa của lòng dũng cảm, sức mạnh thể chất và khí phách kiên cường, ngài cưỡi trên lưng chú cừu đực chiến trận, tay vung đinh ba xua tan chướng ngại và hun đúc tinh thần bất khuất cho các chiến sĩ.",
    rarity: "Cửu Diệu Tinh Quân",
    element: "Hỏa Tinh Xích Huyết · Dũng Khí Sa Trường"
  },
  {
    name: "Brihaspati (Guru - Preceptor of the Gods & Lord of Jupiter)",
    title: "Đại Đạo Sư Guru - Bậc Thầy Của Chư Thiên & Chúa Tể Mộc Tinh",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/brihaspati.webp",
    meaning: "Đạo sư tối cao của toàn thể chư thiên Devas, hiện thân của Sao Mộc (Jupiter) và trí tuệ thấu suốt kinh Veda trong hệ Navagraha. Ngài là hiện thân của lòng nhân từ, triết học và đạo hạnh thuần khiết, ngự trên cỗ xe vàng do tám chú ngựa kéo, luôn dẫn lối cho các vị thần chiến thắng bóng tối bằng chân lý và sự giác ngộ.",
    rarity: "Chí Tôn Đạo Sư Tinh Quân",
    element: "Mộc Tinh Hoàng Kim · Trí Tuệ Veda Giác Ngộ"
  },
  {
    name: "Shukracharya (Lord of Venus & Guru of the Asuras)",
    title: "Đại Đạo Sư Kim Tinh - Bậc Thầy Asura & Nắm Giữ Phép Cải Tử Hoàn Sinh",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/shukracharya.webp",
    meaning: "Đạo sư vĩ đại của quỷ tộc Asura, hiện thân của Sao Kim (Venus) sáng lóa trong hệ Navagraha. Bằng ý chí tu khổ hạnh phi thường trước thần Shiva, ngài đã được truyền thụ bí thuật tối thượng Mrita Sanjivani Vidya giúp hồi sinh những chiến binh tử trận nơi chiến trường, trở thành đối trọng trí tuệ vĩ đại nhất của chư thiên.",
    rarity: "Chí Tôn Đạo Sư Tinh Quân",
    element: "Kim Tinh Bạch Quang · Bí Thuật Sanjivani Hồi Sinh"
  },
  {
    name: "Shani (Lord of Saturn & Master of Justice)",
    title: "Thổ Tinh Thần Shani - Chúa Tể Sao Thổ & Người Phán Quyết Nghiệp Quả",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/shani.webp",
    meaning: "Vị thần nghiêm nghị bậc nhất trong Navagraha đại diện cho Sao Thổ, con trai của thần mặt trời Surya và nữ thần bóng tối Chhaya. Cưỡi trên lưng quạ đen huyền bí, Shani là người thi hành luật nhân quả công minh tuyệt đối, ban thưởng cho sự thiện lương và giáng đại nạn thử thách lên kẻ kiêu căng bất kể là người phàm hay thần thánh.",
    rarity: "Cửu Diệu Tinh Quân",
    element: "Thổ Tinh Hắc Dạ · Nghiệp Quả Thiết Luật"
  },
  {
    name: "Rahu (The Shadow Planet & Eclipse Demon)",
    title: "La Hầu Tinh Thần - Thực Thể Bóng Tối & Chúa Tể Nhật Thực Nguyệt Thực",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/rahu.webp",
    meaning: "Hư tinh bóng tối trong Navagraha, phần đầu bất tử của ác quỷ Swarbhanu sau khi lén uống tiên dược Amrita bị đĩa luân Sudarshana của Vishnu chặt đứt. Rahu không ngừng đuổi theo nuốt chửng Mặt Trời và Mặt Trăng tạo nên hiện tượng nhật thực và nguyệt thực huyền bí, biểu trưng cho tham vọng vô tận và sức mạnh siêu hình huyền ảo.",
    rarity: "Cửu Diệu Ma Tinh",
    element: "La Hầu Hắc Ám · Thôn Phệ Nhật Nguyệt"
  },
  {
    name: "Ketu (The Shadow Planet of Spiritual Liberation)",
    title: "Kế Đô Tinh Thần - Đuôi Rồng Sao Chổi & Ánh Sáng Giải Thoát Moksha",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Cửu Diệu Tinh Tú Navagraha & Thiên Thể Vũ Trụ",
    image: "/assets/hindu/ketu.webp",
    meaning: "Phần thân thể sao chổi và đuôi rồng của Swarbhanu được Mẹ Vũ Trụ tái sinh thành vị thần của sự giải thoát tâm linh (Moksha) trong Navagraha. Ngự trên đóa sen phủ khói sương huyền bí, Ketu đại diện cho trực giác thâm sâu, sự buông bỏ chấp niệm trần tục và khả năng thấu suốt cảnh giới tâm linh tối thượng.",
    rarity: "Cửu Diệu Diệu Tinh",
    element: "Kế Đô Tinh Vân · Giải Thoát Moksha Chân Thể"
  },
  {
    name: "Ushas (Goddess of the Dawn)",
    title: "Rạng Đông Thần Nữ - Ánh Bình Minh Tươi Sáng Đánh Thức Vạn Vật",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/ushas.webp",
    meaning: "Nữ thần bình minh tuyệt mỹ trong thánh thi Rigveda, con gái của vòm trời Dyaus, người đánh thức vạn vật tỉnh giấc mỗi buổi sớm mai. Lướt qua không gian trên cỗ xe vàng óng kéo bởi những chú ngựa tía rực rỡ, Ushas xua tan bóng tối và điềm gở, mang lại nguồn sinh khí mới, sự thịnh vượng và nguồn cảm hứng bất tận cho muôn loài.",
    rarity: "Huyền Thoại Bình Minh Nữ Thần",
    element: "Bình Minh Thần Hy · Ánh Sáng Rạng Đông"
  },
  {
    name: "Rati (Goddess of Passion & Desire)",
    title: "Ái Dục Thần Nữ Rati - Nữ Thần Tình Yêu Son Sắt & Đam Mê Quyến Rũ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/rati.webp",
    meaning: "Hiện thân thiêng liêng của tình yêu lãng mạn, sắc đẹp quyến rũ và lòng chung thủy tuyệt đối, người bạn đời vĩnh cửu của thần tình yêu Kamadeva. Khi Kamadeva bị con mắt thứ ba của Shiva thiêu rụi, lòng kiên trinh và sự cầu xin thống thiết của Rati đã khiến thần Shiva cảm động, cho phép chồng nàng tái sinh thành hoàng tử Pradyumna.",
    rarity: "Huyền Thoại Ái Tình Nữ Thần",
    element: "Ái Tình Mê Hoặc · Chung Thủy Bất Diệt"
  },
  {
    name: "Ashwini Kumaras (The Twin Divine Physicians)",
    title: "Song Mã Thần Y - Cặp Thần Sinh Đôi Trị Liệu Bách Bệnh Cõi Trời",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/ashwini-kumaras.webp",
    meaning: "Cặp anh em sinh đôi thần thánh Nasatya và Dasra, con trai của thần mặt trời Surya và nữ thần mây Sanjna trong hình hài tuấn mã. Là các thần y tối cao của thiên giới, họ cưỡi cỗ xe vàng mang theo phương thuốc trường xuân, từng phục hồi tuổi thanh xuân và thị lực cho đại hiền triết Chyavana, cha đẻ của cặp song sinh Nakula và Sahadeva trong Mahabharata.",
    rarity: "Chí Tôn Thần Y Song Tinh",
    element: "Diệu Dược Hồi Xuân · Song Mã Thần Tốc"
  },
  {
    name: "Vishwakarma (The Supreme Divine Architect)",
    title: "Đại Thiên Công Vishwakarma - Kiến Trúc Sư Vĩ Đại Của Thiên Đình & Thần Khí",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/vishwakarma.webp",
    meaning: "Thợ rèn và kiến trúc sư tối cao của toàn cõi thiên giới, người tạo tác nên toàn bộ cung điện thần thánh từ đảo vàng Lanka, thành phố biển Dwarka đến cung điện Indraprastha kỳ ảo. Ngài chính là bậc thầy đã dùng bụi mặt trời của thần Surya để tôi luyện nên cây đinh ba Trishula của Shiva, đĩa luân Sudarshana của Vishnu và Kim Cang Chùy Vajra của Indra.",
    rarity: "Chí Tôn Thiên Công Thần",
    element: "Vạn Vật Tạo Tác · Thần Khí Bách Luyện"
  },
  {
    name: "Chitragupta (The Divine Scribe of Karma)",
    title: "Thần Thư Ký Cõi Âm - Người Nắm Giữ Cuốn Sổ Sinh Tử Agrasandhani",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Chư Thiên Devas & Bát Phương Hộ Thế Thần",
    image: "/assets/hindu/chitragupta.webp",
    meaning: "Vị thần sinh ra từ tâm thức và thân thể của đấng sáng tạo Brahma, trợ thủ đắc lực nhất của Minh Vương Yama nơi tòa án cõi âm. Tay cầm bút lông chim và cuốn sổ vĩnh cửu Agrasandhani, ngài ghi chép tỉ mỉ từng ý nghĩ, lời nói và hành vi thiện ác của mọi sinh linh từ lúc sinh ra đến khi nhắm mắt, bảo đảm công lý nhân quả không sai một ly.",
    rarity: "Chí Tôn Minh Phán Thần",
    element: "Thiên Thư Sinh Tử · Bút Lông Phán Nghiệp"
  },
  {
    name: "Durvasa (The Sage of Divine Wrath)",
    title: "Đại Hiền Triết Durvasa - Hóa Thân Phẫn Nộ Của Thần Shiva & Lời Nguyền Kinh Thiên",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/durvasa.webp",
    meaning: "Hóa thân phẫn nộ của thần Shiva sinh ra từ hiền giả Atri và nàng Anasuya, vị đại đạo sĩ lừng danh với tính khí nghiêm khắc và những lời nguyền làm rung chuyển tam giới. Dù lời nguyền của ngài từng khiến chư thiên mất hết linh lực dẫn tới cuộc khuấy biển sữa, sự hài lòng của ngài cũng ban tặng cho công chúa Kunti thần chú triệu hồi chư thiên sinh ra các anh hùng Pandava.",
    rarity: "Tuyệt Thế Thánh Hiền",
    element: "Phẫn Nộ Chân Ngôn · Thần Chú Vạn Năng"
  },
  {
    name: "Markandeya (The Immortal Sage of Lord Shiva)",
    title: "Bất Tử Đại Thánh Markandeya - Người Chiến Thắng Thần Chết Dưới Chân Shiva",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Đại Thánh Đạo Sư Rishis & Hiền Triết Cổ Đại",
    image: "/assets/hindu/markandeya.webp",
    meaning: "Đại hiền triết vĩ đại được định sẵn chỉ sống đến năm mười sáu tuổi, nhưng nhờ lòng kiên định ôm chặt lấy biểu tượng Shiva Lingam tụng niệm kinh chú Mahamrityunjaya, thần Shiva đã hiện thân tung cước đạp ngã thần chết Yama để bảo vệ ngài. Markandeya được ban cho tuổi thọ bất tử mãi mãi ở tuổi 16 và chứng kiến chu kỳ tái sinh của cả vũ trụ.",
    rarity: "Chí Tôn Bất Tử Đại Thánh",
    element: "Mahamrityunjaya Thần Chú · Trường Sinh Vĩnh Cửu"
  },
  {
    name: "Prahlada (The Supreme Devotee & Avatar Catalyst)",
    title: "Thánh Nhi Prahlada - Lòng Tin Bất Diệt Đánh Thức Chúa Tể Narasimha",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Tam Vị Nhất Thể Trimurti & Tối Cao Thần",
    image: "/assets/hindu/prahlada.webp",
    meaning: "Con trai của ma vương bạo ngược Hiranyakashipu, người từ trong bụng mẹ đã lắng nghe lời giảng đạo của hiền triết Narada và mang đức tin thuần khiết bất diệt vào thần Vishnu. Dù bị cha đày ải ném vào biển lửa, rắn độc và vực sâu, Prahlada vẫn bình an vô sự, niềm tin kiên định của ngài đã khiến cột đá nứt toác để Hóa thân Nhân Sư Narasimha giáng trần tiêu diệt bạo chúa.",
    rarity: "Chí Tôn Thánh Tín Đồ",
    element: "Đức Tin Bất Diệt · Narasimha Hộ Thể"
  },
  {
    name: "Mahabali (King of the Asuras & Lord of Sutala)",
    title: "Minh Vương Mahabali - Vua Asura Đại Hào Phóng & Chúa Tể Cõi Sutala",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Ma Vương Asura & Lãnh Chúa Vực Thẳm",
    image: "/assets/hindu/mahabali.webp",
    meaning: "Cháu nội của Prahlada, vị minh vương Asura độ lượng và hào hiệp bậc nhất lịch sử đã chinh phục toàn bộ ba cõi. Khi hóa thân chú lùn Vamana của Vishnu xin ba bước chân đất và bước trùm cả trời đất, Mahabali đã cúi đầu dâng chính đỉnh đầu mình cho bước chân thứ ba, cảm kích tấm lòng ấy, Vishnu đã ban cho ngài ngôi vua cõi thiên đường dưới lòng đất Sutala.",
    rarity: "Chí Tôn Asura Minh Vương",
    element: "Tam Bộ Thần Khế · Đại Độ Lượng Hào Hiệp"
  },
  {
    name: "Ekalavya (The Devoted Archer Prodigy)",
    title: "Xạ Thủ Thiên Tài Ekalavya - Huyền Thoại Cung Thuật Bằng Tượng Đất Sư Phụ",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/ekalavya.webp",
    meaning: "Chàng trai dũng cảm của bộ tộc thợ săn Nishada bị từ chối nhập học nhưng đã tự nặn tượng đất của danh sư Dronacharya để ngày đêm khổ luyện, đạt tới cảnh giới bắn liền bảy mũi tên bịt mõm chó sủa mà không làm trầy một giọt máu. Khi sư phụ yêu cầu ngón tay cái bên phải làm học phí Guru Dakshina, ngài đã không ngần ngại tự cắt dâng tặng thể hiện lòng tôn sư tuyệt đỉnh.",
    rarity: "Huyền Thoại Cung Thần",
    element: "Tuyệt Kỹ Liên Xạ · Tôn Sư Trọng Đạo"
  },
  {
    name: "Ashwatthama (The Immortal Warrior of Drona)",
    title: "Chiến Binh Bất Tử Ashwatthama - Mãnh Tướng Mang Viên Ngọc Thần Trên Trán",
    category: "hindu",
    categoryLabel: "Thần Thoại Ấn Độ",
    faction: "Sử Thi Mahabharata & Anh Hùng Kurukshetra",
    image: "/assets/hindu/ashwatthama.webp",
    meaning: "Con trai dũng mãnh của danh sư Dronacharya, một trong bảy bậc bất tử Chiranjivi của thế giới sở hữu viên ngọc thần hộ mệnh rạng ngời gắn trên trán. Là đại dũng sĩ phe Kaurava tinh thông mọi thần khí hủy diệt như Brahmashira, tiếng gầm thét như sấm sét nơi chiến trường Kurukshetra của ngài từng khiến muôn vàn chiến binh khiếp vía kinh hồn.",
    rarity: "Huyền Thoại Bất Tử Dũng Sĩ",
    element: "Trán Thần Linh Ngọc · Brahmashira Hủy Diệt"
  }
];

// Check all 107 images exist
const missingImages = [];
hinduCharacters.forEach(c => {
  const diskPath = path.join('public', c.image);
  if (!fs.existsSync(diskPath)) {
    missingImages.push(c.image);
  }
});

if (missingImages.length > 0) {
  console.error("Missing images:", missingImages);
  process.exit(1);
}

// Assign unique IDs: HD-01 to HD-99, HD-100 to HD-107
const charactersWithIds = hinduCharacters.map((c, idx) => {
  const num = (idx + 1).toString().padStart(2, '0');
  return {
    id: `HD-${num}`,
    ...c
  };
});

// Write src/data/chibi/hindu.json
const destPath = path.join('src', 'data', 'chibi', 'hindu.json');
fs.writeFileSync(destPath, JSON.stringify(charactersWithIds, null, 2), 'utf-8');
console.log(`Successfully written ${destPath} with ${charactersWithIds.length} characters.`);

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

