import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // ✅ LOAD USER FROM LOCAL STORAGE
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  // ✅ AUTH STATUS
  const isAuthenticated = !!user;

<<<<<<< HEAD
  /* ================= LOGIN ================= */
  const login = (data) => {

    // save user
    setUser(data.user);

    // save token
    localStorage.setItem(
      "token",
      data.token
    );

    // save user
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
  };
   /* ================= UPDATE USER ================= */
  const updateUser = (updatedData) => {

  const updatedUser = {
    ...user,
    ...updatedData,
=======
  const login = (userData) => {
    setIsAuthenticated(true);
    
    // Normalize user data to ensure all required fields exist
    const newUser = {
      ...userData,
      token: userData.token || localStorage.getItem("token"),
      avatar_url: userData.avatar_url || null,
      isProfileComplete: userData.isProfileComplete ?? false,
      isGoogleUser: (userData.isGoogleUser || !!userData.googleId) ?? false,
      googleId: userData.googleId ?? null,
      hasPassword: userData.hasPassword ?? false,
    };

    setUser(newUser);
    localStorage.setItem('token', newUser.token);
    localStorage.setItem('user', JSON.stringify(newUser));
    // Clear skip flags on every login to ensure onboarding triggers correctly
    localStorage.removeItem("preferencesSkipped");
>>>>>>> 46475d46a8b8297766ec84501c47bd26576c41d9
  };

  setUser(updatedUser);

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
    );
  };
  /* ================= LOGOUT ================= */
  const logout = () => {

    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  /* ================= FETCH PROFILE ================= */
  const fetchUserProfile = useCallback(async () => {
    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = await response.json();

      if (response.ok && userData) {

        const newUser = {
          ...userData,
          avatar_url:
            userData.avatar_url || null,

          isProfileComplete:
            userData.isProfileComplete ?? false,

          isGoogleUser:
            userData.isGoogleUser ?? false,

          googleId:
            userData.googleId ?? null,

          hasPassword:
            userData.hasPassword ?? false,
        };

        setUser(newUser);

        localStorage.setItem(
          "user",
          JSON.stringify(newUser)
        );
      }

    } catch (error) {

      console.error(
        "Error fetching user profile:",
        error
      );
    }
  }, []);

  return (
    <AuthContext.Provider
    value={{
    user,
    setUser,
    login,
    logout,
    updateUser,
    fetchUserProfile,
    isAuthenticated,
}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () =>
  useContext(AuthContext);