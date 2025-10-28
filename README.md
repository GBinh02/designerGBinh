# 🎉 Birthday Web - Dự Án Web Sinh Nhật

Website chúc mừng sinh nhật với giao diện hiện đại và nhiều hiệu ứng đẹp mắt được xây dựng bằng React + Vite + Tailwind CSS.

## ✨ Tính Năng

- 🎁 **Màn hình chào mừng** với hiệu ứng bóng bay và ngôi sao
- 📸 **Thư viện ảnh** với slideshow tự động và hiệu ứng chuyển động
- 💌 **Thiệp chúc mừng** có hiệu ứng mở thiệp 3D và pháo hoa
- 🎂 **Bánh sinh nhật** với nến có thể thổi tắt và confetti rơi
- 📱 **Responsive design** - Hoạt động tốt trên mọi thiết bị

## 🚀 Cài Đặt

### Yêu cầu
- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone hoặc tạo thư mục dự án**
```bash
mkdir birthday-web
cd birthday-web
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Thêm ảnh vào thư mục public/images/**
   - Đặt 3 tấm ảnh vào `public/images/` với tên:
     - photo1.jpg
     - photo2.jpg
     - photo3.jpg

4. **Chạy ứng dụng**
```bash
npm run dev
```

5. **Mở trình duyệt** tại `http://localhost:3000`

## 📁 Cấu Trúc Dự Án

```
birthday-web/
├── public/
│   └── images/           # Thư mục chứa ảnh
│       ├── photo1.jpg
│       ├── photo2.jpg
│       └── photo3.jpg
├── src/
│   ├── components/       # Các component React
│   │   ├── ClickScreen.jsx      # Màn hình chào mừng
│   │   ├── PhotoGallery.jsx     # Thư viện ảnh
│   │   ├── GreetingCard.jsx     # Thiệp chúc mừng
│   │   ├── BirthdayCake.jsx     # Bánh sinh nhật
│   │   └── Fireworks.jsx        # Hiệu ứng pháo hoa
│   ├── pages/
│   │   └── HomePage.jsx          # Trang chính
│   ├── App.jsx
│   ├── App.css              # Custom CSS và animations
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Tùy Chỉnh

### Thay đổi nội dung lời chúc

Mở file `src/components/GreetingCard.jsx` và chỉnh sửa phần:

```jsx
<p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-4 text-center">
  🌟 <strong>Chúc bạn một tuổi mới tràn đầy niềm vui,</strong> 🌟
</p>
```

### Thay đổi màu sắc

Các gradient color có thể thay đổi trong các file component:
- `from-pink-400 via-purple-500 to-indigo-600`
- `from-rose-400 via-fuchsia-500 to-indigo-600`

### Thêm/Bớt ảnh

Trong file `src/components/PhotoGallery.jsx`, chỉnh sửa mảng `photos`:

```jsx
const photos = [
  {
    src: '/images/photo1.jpg',
    caption: 'Những khoảnh khắc đẹp đẽ',
    bg: 'from-rose-400 to-pink-600',
    icon: '🌟'
  },
  // Thêm ảnh mới tại đây
];
```

## 🛠️ Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build cho production
npm run preview  # Xem trước bản build
```

## 📦 Dependencies

- **react** - Thư viện UI
- **react-dom** - React DOM rendering
- **lucide-react** - Icon library
- **tailwindcss** - CSS framework
- **vite** - Build tool

## 🎯 Luồng Hoạt Động

1. **ClickScreen** → Nhấn nút "Mở Quà"
2. **PhotoGallery** → Xem slideshow 3 ảnh → Nhấn "Xem Thiệp"
3. **GreetingCard** → Mở thiệp xem lời chúc → Nhấn "Thổi Nến"
4. **BirthdayCake** → Thổi nến, xem confetti → "Chơi Lại" để reset

## 💡 Tips

- Đặt ảnh có kích thước phù hợp (khuyến nghị 800x600px)
- Ảnh nên có định dạng JPG hoặc PNG
- Nếu không có ảnh, component sẽ hiển thị placeholder với emoji

## 🐛 Troubleshooting

### Ảnh không hiển thị?
- Kiểm tra đường dẫn trong `public/images/`
- Đảm bảo tên file khớp với code (photo1.jpg, photo2.jpg, photo3.jpg)

### Port 3000 đã được sử dụng?
Thay đổi port trong `vite.config.js`:
```js
server: {
  port: 3001,  // Đổi sang port khác
  open: true
}
```

## 📝 License

MIT License - Sử dụng tự do cho mục đích cá nhân

## 🎊 Tạo bởi

Được xây dựng với ❤️ sử dụng React, Vite và Tailwind CSS

---

**Chúc mừng sinh nhật! 🎂🎉**