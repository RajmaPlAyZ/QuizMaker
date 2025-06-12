import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
} from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    updateDoc,
    where,
    writeBatch
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const templateQuizzes = [
  {
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    questions: 15,
    responses: 234,
    status: "published",
    createdAt: new Date("2024-01-15"),
    lastModified: new Date("2024-01-20"),
    tags: ["Programming", "Web Development"],
    featured: true,
    completionRate: 78,
    averageScore: 72,
  },
  {
    title: "React Components Quiz",
    description: "Advanced React concepts and patterns",
    questions: 20,
    responses: 89,
    status: "draft",
    createdAt: new Date("2024-01-10"),
    lastModified: new Date("2024-01-18"),
    tags: ["Programming", "React", "Frontend"],
    featured: false,
    completionRate: 65,
    averageScore: 68,
  },
  {
    title: "CSS Grid & Flexbox",
    description: "Modern CSS layout techniques",
    questions: 12,
    responses: 156,
    status: "published",
    createdAt: new Date("2024-01-08"),
    lastModified: new Date("2024-01-12"),
    tags: ["Web Development", "CSS", "Design"],
    featured: true,
    completionRate: 92,
    averageScore: 84,
  },
  {
    title: "TypeScript Advanced Types",
    description: "Master complex TypeScript type systems",
    questions: 18,
    responses: 42,
    status: "published",
    createdAt: new Date("2024-01-05"),
    lastModified: new Date("2024-01-07"),
    tags: ["Programming", "TypeScript"],
    featured: false,
    completionRate: 58,
    averageScore: 62,
  },
  {
    title: "UI/UX Design Principles",
    description: "Test your knowledge of design fundamentals",
    questions: 25,
    responses: 118,
    status: "published",
    createdAt: new Date("2024-01-03"),
    lastModified: new Date("2024-01-05"),
    tags: ["Design", "UI/UX"],
    featured: false,
    completionRate: 85,
    averageScore: 76,
  },
];

// Email/Password Authentication Functions
export const signUp = async (email: string, password: string, displayName: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
};

export const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logOut = async () => {
    await signOut(auth);
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

// Quiz functions
export const createQuiz = async (quizData: any, userId: string) => {
    const quizRef = await addDoc(collection(db, "quizzes"), {
        ...quizData,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    return quizRef.id;
};

export const getUserQuizzes = async (userId: string) => {
    try {
        const quizzesRef = collection(db, "quizzes");
        const q = query(
            quizzesRef,
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        
        // If user has no quizzes, create template quizzes
        if (querySnapshot.empty) {
            const batch = writeBatch(db);
            
            templateQuizzes.forEach((template) => {
                const docRef = doc(collection(db, "quizzes"));
                batch.set(docRef, {
                    ...template,
                    userId,
                    createdAt: serverTimestamp(),
                    lastModified: serverTimestamp(),
                    isTemplate: true
                });
            });
            
            await batch.commit();
            
            // Fetch the newly created quizzes
            const newQuerySnapshot = await getDocs(q);
            return newQuerySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
                lastModified: doc.data().lastModified?.toDate().toISOString() || new Date().toISOString()
            }));
        }
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
            lastModified: doc.data().lastModified?.toDate().toISOString() || new Date().toISOString()
        }));
    } catch (error) {
        console.error("Error getting user quizzes:", error);
        throw error;
    }
};

export const getQuiz = async (quizId: string) => {
    const docRef = doc(db, "quizzes", quizId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    }
    return null;
};

export const updateQuiz = async (quizId: string, data: any) => {
    try {
        const quizRef = doc(db, "quizzes", quizId);
        await updateDoc(quizRef, {
            ...data,
            lastModified: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw error;
    }
};

export const toggleQuizFeatured = async (quizId: string, featured: boolean) => {
    try {
        const quizRef = doc(db, "quizzes", quizId);
        await updateDoc(quizRef, {
            featured,
            lastModified: serverTimestamp()
        });
    } catch (error) {
        console.error("Error toggling quiz featured status:", error);
        throw error;
    }
};

export const duplicateQuiz = async (quizId: string, userId: string) => {
    try {
        const quizRef = doc(db, "quizzes", quizId);
        const quizDoc = await getDoc(quizRef);
        
        if (!quizDoc.exists()) {
            throw new Error("Quiz not found");
        }

        const quizData = quizDoc.data();
        const newQuizRef = doc(collection(db, "quizzes"));
        
        await setDoc(newQuizRef, {
            ...quizData,
            id: newQuizRef.id,
            userId,
            title: `${quizData.title} (Copy)`,
            createdAt: serverTimestamp(),
            lastModified: serverTimestamp(),
            isTemplate: false
        });

        return newQuizRef.id;
    } catch (error) {
        console.error("Error duplicating quiz:", error);
        throw error;
    }
};

export const deleteQuiz = async (quizId: string) => {
    const docRef = doc(db, "quizzes", quizId);
    await deleteDoc(docRef);
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

export { auth, db };

