import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "scores"), (snapshot) => {
      setScores(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Live Scoreboard</h1>
      <div className="max-w-md mx-auto bg-white p-4 shadow-lg rounded-lg">
        {scores.map((score) => (
          <div key={score.id} className="flex justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">{score.team}</h2>
            <p className="text-xl font-bold">{score.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
