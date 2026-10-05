import { useEffect, useState } from "react";
import ProfileHeader from "../components/profile_components/ProfileHeader";
import ProfileTabs from "../components/profile_components/ProfileTabs";
import SubscriptionCard from "../components/profile_components/SubscriptionCard";
import DispatchList from "../components/profile_components/DispatchList";
import FlavorProfile from "../components/profile_components/FlavorProfile";
import PassCard from "../components/profile_components/PassCard";
import DeliveryPoint from "../components/profile_components/DeliveryPoint";
import PrivilegesCard from "../components/profile_components/PrivilegesCard";
import { getProfile } from "../components/profile_components/profileService";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    let ignore = false;

    getProfile()
      .then((data) => {
        if (!ignore) setProfile(data);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        if (!ignore) setError("We couldn't load your profile. Try again later.");
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-[#18120f] px-6 py-12 font-body text-[#d5c4b1]">
        <p className="mx-auto max-w-[1440px]">{error || "Loading your guild profile..."}</p>
      </main>
    );
  }

  // what each tab shows
  let content;

  if (activeTab === "orders") {
    content = <DispatchList dispatches={profile.dispatches} />;
  } else if (activeTab === "sensory") {
    content = <FlavorProfile flavor={profile.flavor} />;
  } else if (activeTab === "addresses") {
    content = (
      <div className="max-w-xl">
        <DeliveryPoint delivery={profile.delivery} />
      </div>
    );
  } else if (activeTab === "perks") {
    content = (
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <PassCard member={profile.member} pass={profile.pass} />
        <PrivilegesCard privileges={profile.privileges} />
      </div>
    );
  } else {
    // overview: everything, like the design
    content = (
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <SubscriptionCard subscription={profile.subscription} />
          <DispatchList dispatches={profile.dispatches} onViewAll={() => setActiveTab("orders")} />
          <FlavorProfile flavor={profile.flavor} />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-4">
          <PassCard member={profile.member} pass={profile.pass} />
          <DeliveryPoint delivery={profile.delivery} />
          <PrivilegesCard privileges={profile.privileges} />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#18120f] font-body text-[#ede0da]">
      <div className="mx-auto max-w-[1440px] px-4 pt-8 pb-12 sm:px-8">
        <ProfileHeader member={profile.member} />
        <ProfileTabs active={activeTab} onChange={setActiveTab} />

        <div id="profile-panel" role="tabpanel" aria-labelledby={`profile-tab-${activeTab}`}>
          {content}
        </div>
      </div>
    </main>
  );
}
