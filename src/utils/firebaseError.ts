export function firebaseErrorMessage(err: any): string {
  if (!err) return 'An unknown error occurred';
  const code = err.code || err?.error || null;
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/user-not-found':
      return 'No user found for this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'Email is already registered.';
    case 'auth/weak-password':
      return 'Password is too weak (min 6 characters).';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Try again later.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    default:
      return err?.message || 'Authentication failed.';
  }
}

export default firebaseErrorMessage;
