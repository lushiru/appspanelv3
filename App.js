import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from "./src/contexts";
import { RootNavigation } from "./src/navigation";

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </AuthProvider>
  );
}
