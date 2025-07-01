# KoKo Ni! - AI-Powered Japanese Learning Website

A beautiful full-stack web application for learning Japanese through AI-powered conversations and practical travel scenarios.

## Features

- **ChatGPT-style Interface**: Natural conversation flow with expandable input
- **20 Travel Scenarios**: Pre-built scenarios for common tourist situations in Japan
- **Japanese Aesthetic**: Beautiful design with samurai artwork and Japanese typography
- **Responsive Design**: Works perfectly on all devices
- **AI Integration**: Powered by LLaMA for intelligent responses

## Getting Started

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Backend

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
python server.py
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx       # App header with logo and title
│   │   ├── Sidebar.tsx      # Collapsible scenario sidebar
│   │   └── ChatArea.tsx     # Main chat interface
│   ├── data/
│   │   └── scenarios.ts     # 20 Japanese travel scenarios
│   └── App.tsx             # Main application component
├── backend/
│   ├── server.py           # Flask backend server
│   └── requirements.txt    # Python dependencies
└── README.md
```

## Travel Scenarios

The app includes 20 pre-built scenarios covering:
- Restaurant interactions
- Transportation (trains, buses, taxis)
- Hotel services
- Shopping
- Medical emergencies
- Tourist attractions

Each scenario includes:
- Japanese phrase
- English translation
- Cultural context

## Deployment

To deploy both frontend and backend together, the app is configured to work with modern hosting platforms that support both static sites and serverless functions.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Python, Flask, Flask-CORS
- **AI**: LLaMA integration (configurable)
- **Design**: Japanese fonts (Noto Sans JP, Zen Kurenaido)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License."# KoKo-Ni-V.1" 
