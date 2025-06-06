// components/shared/Logo.tsx
import { Monitor } from "lucide-react";

const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
      <Monitor className="w-5 h-5 text-white" />
    </div>
    <span className="text-xl font-bold text-slate-900 dark:text-white">AppNest</span>
  </div>
);

export default Logo;
