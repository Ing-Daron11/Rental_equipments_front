import LoginForm from '@/components/loginForm';

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </main>
  );
}
