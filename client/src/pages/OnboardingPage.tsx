import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, ALL_TOPICS } from '../store/userStore';
import type { AgeGroup } from '@kidstream/shared/src/types';

const AGE_GROUPS: { value: AgeGroup; label: string; emoji: string }[] = [
  { value: '3-5', label: '3 - 5 years', emoji: '🧒' },
  { value: '6-8', label: '6 - 8 years', emoji: '👦' },
  { value: '9-12', label: '9 - 12 years', emoji: '🧑' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (topic: string) => {
    setSelectedInterests((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const handleFinish = () => {
    if (!name.trim() || !ageGroup || selectedInterests.length === 0) return;
    completeOnboarding(name.trim(), ageGroup, selectedInterests);
    navigate('/feed', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-500 to-primary-700 flex flex-col items-center justify-center px-6 py-10">
      {/* Logo */}
      <h1 className="font-display text-3xl font-extrabold text-white mb-2">KidStream</h1>
      <p className="text-primary-200 text-sm mb-8">Find awesome content just for you!</p>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                s === step ? 'bg-primary-600 scale-125' : s < step ? 'bg-primary-300' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-center">What's your name?</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              maxLength={20}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-center text-lg font-medium focus:outline-none focus:border-primary-400 transition"
              autoFocus
            />
            <button
              onClick={() => name.trim() && setStep(2)}
              disabled={!name.trim()}
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-semibold disabled:opacity-40 hover:bg-primary-700 transition"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Age group */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-center">
              Hi {name}! How old are you?
            </h2>
            <div className="space-y-2">
              {AGE_GROUPS.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => setAgeGroup(value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition text-left ${
                    ageGroup === value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={() => ageGroup && setStep(3)}
                disabled={!ageGroup}
                className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-semibold disabled:opacity-40 hover:bg-primary-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-center">
              What do you like?
            </h2>
            <p className="text-xs text-gray-500 text-center">Pick at least 3 topics</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {ALL_TOPICS.map((topic) => {
                const selected = selectedInterests.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleInterest(topic)}
                    className={`px-3 py-2 rounded-full text-sm font-medium border-2 transition ${
                      selected
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-center text-gray-400">
              {selectedInterests.length} selected
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-semibold hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={selectedInterests.length < 3}
                className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-semibold disabled:opacity-40 hover:bg-primary-700 transition"
              >
                Let's Go!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
