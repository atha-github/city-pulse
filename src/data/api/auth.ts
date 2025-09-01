import auth from '@react-native-firebase/auth';

export const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  return auth().createUserWithEmailAndPassword(email, password);
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  return auth().signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return auth().signOut();
};

export const sendPasswordResetEmail = async (email: string) => {
  return auth().sendPasswordResetEmail(email);
};

export const confirmPasswordReset = async (oobCode: string, newPassword: string) => {
  return auth().confirmPasswordReset(oobCode, newPassword);
};

export const getCurrentUser = () => {
  try {
    return auth().currentUser;
  } catch (e) {
    return null;
  }
};

export default {
  registerUser,
  loginUser,
  logout,
  getCurrentUser,
};
