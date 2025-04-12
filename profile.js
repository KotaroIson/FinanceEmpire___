import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (auth.currentUser) {
        const ref = doc(db, "users", auth.currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setUserData(snap.data());
      }
    };
    loadUserData();
  }, []);

  if (!userData) return <div className="text-white">Загрузка...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-4">Привет, {auth.currentUser.email}</h1>
      <div className="mb-4">
        <h2 className="text-xl">Твои цели:</h2>
        <ul className="list-disc ml-5">
          {userData.goals.map((goal, idx) => (
            <li key={idx}>
              {goal.title} — {goal.status}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl">История действий:</h2>
        <ul className="list-disc ml-5">
          {userData.history.map((h, idx) => (
            <li key={idx}>{h.type} — {h.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
