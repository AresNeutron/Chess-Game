Chess Game with Backend Logic This is the demo of a full-stack chess game project built from the ground up. Every component, from the user interface to the backend server and API, has been carefully designed and developed from scratch. The project provides a fully functional chessboard with implemented game logic, including special moves like castling and pawn promotion. It's not already completed since it does not have fully resposible design. This repository is being created only to provide the code, by the moment. It may have some errors

Features Interactive Chessboard Click-and-move functionality. Real-time visual indicators for valid moves.

Backend-Powered Game Logic

Built using Typescript, Express and Node. The backend calculates all possible moves for each piece dynamically, and stores them in a database. Robust update-moves function keeps track of valid moves in real-time. King safety verification: automatic detection and enforcement of moves to escape check. Handles special rules like castling and en passant.

Database Integration

MongoDB used for backend data storage. Chess pieces are stored as collections with the fields name, position, hasMoved, and moves. Typescript scripts prepopulate the database with all pieces on game initialization.

API

RESTful API under /api. Endpoints for retrieving and updating game state. Enables seamless communication between the frontend and backend.

How It Works Backend Initialization

On server start, the database is cleared and repopulated with the initial chessboard configuration. update-moves dynamically calculates all possible moves for each piece. Frontend Integration

Players interact with a fully responsive React-based UI. Piece movements are validated via API calls to ensure adherence to chess rules. Game Flow

Pieces move between valid positions. Check and checkmate detection ensures the integrity of the game.

Future Enhancements

Implement AI-powered opponents. Add multiplayer capabilities. Enhance the UI with additional visual elements.

Acknowledgments This project was built entirely from scratch, showcasing custom-built algorithms, API design, and frontend development.