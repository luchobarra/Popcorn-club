import { Header } from "./components/Header";
import { AppRouter } from "./AppRouter";


export const App = () => {
  return (
    <>
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]">
        <Header />
      

        <AppRouter />       
      </div>
    </>
  );
};