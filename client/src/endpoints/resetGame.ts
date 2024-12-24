const resetGame = async () => {
    try {
      await fetch("http://127.0.0.1:8000/reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Game reset successfully!");
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

export default resetGame
  