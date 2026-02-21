backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── user.controller.js
│   └── auth.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── models/
│   ├── user.model.js
│   └── admin.model.js
│
├── routes/
│   ├── user.routes.js
│   └── auth.routes.js
│
├── utils/
│   └── csvExport.js
│
├── server.js
└── .env

src/
│
├── assets/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── landing/
│   │   ├── Hero.jsx
│   │   ├── CTA.jsx
│   │   └── FAQ.jsx
│   │
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Toast.jsx
│   │
│   └── users/
│       ├── UserTable.jsx
│       ├── UserForm.jsx
│       └── UserCard.jsx
│
├── pages/
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── AddUser.jsx
│   ├── EditUser.jsx
│   └── ViewUser.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   └── api.js
│
├── context/
│   └── AuthContext.jsx
│
├── utils/
│   └── validators.js
│
├── App.jsx
└── main.jsx