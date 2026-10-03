import { useState } from "react";
import { Link } from "react-router-dom";
import StoryPanel from "./StoryPanel";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// The whole card: story on the left, tabs + form on the right.
//   initialTab : "login" or "register"
//   notice     : optional message shown above the form (used when sent here from the cart)
//   onSuccess  : called after a successful sign in / register
export default function AuthCard({ initialTab = "login", notice = "", onSuccess }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-[#211a17] shadow-xl">
      <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-12">
        <StoryPanel />

        <div className="flex flex-col justify-between bg-[#211a17] p-6 lg:col-span-7 lg:p-10">
          <div>
            <AuthTabs active={tab} onChange={setTab} />

            {notice && (
              <p role="status" className="mb-5 rounded-lg bg-[#302825] p-3 font-body text-[13px] leading-5 text-[#fcba5f]">
                {notice}
              </p>
            )}

            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              {tab === "login" ? <LoginForm onSuccess={onSuccess} /> : <RegisterForm onSuccess={onSuccess} />}
            </div>
          </div>

          <div className="mt-8 pt-2">
            <Link
              to="/contact"
              className="font-label text-[10px] leading-[14px] font-semibold uppercase tracking-wider text-[#9e8e7e] transition-colors hover:text-[#ede0da]"
            >
              Need assistance?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
