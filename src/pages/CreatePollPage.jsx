import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeadlineSelector from '../components/poll/DeadlineSelector';
import LocationCard from '../components/poll/LocationCard';
import PhotoGrid from '../components/poll/PhotoGrid';
import { POLL_OPTIONS } from '../constants/pollOptions';
import { useImageUpload } from '../hooks/useImageUpload';
import { usePoll } from '../hooks/usePoll';
import { validatePoll } from '../utils/validatePoll';

const locationCandidates = ['서울숲 근처', '성수 카페거리 근처', '한강공원 근처'];

function CreatePollPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [deadlineHours, setDeadlineHours] = useState(POLL_OPTIONS.durations[1].value);
  const [useLocation, setUseLocation] = useState(true);
  const [locationName, setLocationName] = useState('서울숲 근처');
  const [formErrors, setFormErrors] = useState({});
  const { photos, addPhotos, removePhoto, resetPhotos, error: imageError } = useImageUpload();
  const { createPoll, isCreating, error: createError } = usePoll();

  const handleSubmit = async () => {
    const poll = {
      title,
      photos,
      deadlineHours,
      location: useLocation ? locationName : '',
    };
    const validation = validatePoll(poll);
    setFormErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    const result = await createPoll({
      ...poll,
      title: title.trim(),
      photos: photos.map(({ id, file, name, previewUrl }) => ({
        id,
        file,
        name,
        previewUrl,
      })),
    });

    if (result.ok) {
      resetPhotos();
      navigate(`/share/${result.id}`, {
        state: {
          title: title.trim(),
          photoCount: photos.length,
          deadlineHours,
        },
      });
    }
  };

  return (
    <main className="app-canvas page-canvas create-canvas">
      <header className="stack-header">
        <button className="icon-button" type="button" onClick={() => navigate('/home')} aria-label="뒤로가기">
          ‹
        </button>
        <h1>새 투표 만들기</h1>
      </header>

      <label className="field-group">
        <span>투표 제목</span>
        <input
          type="text"
          value={title}
          maxLength={40}
          placeholder="투표의 제목을 작성해주세요!"
          onChange={(event) => setTitle(event.target.value)}
        />
        {formErrors.title && <p className="form-error">{formErrors.title}</p>}
      </label>

      <PhotoGrid
        photos={photos}
        onAddPhotos={addPhotos}
        onRemovePhoto={removePhoto}
        error={formErrors.photos || imageError}
      />

      <LocationCard
        enabled={useLocation}
        onEnabledChange={setUseLocation}
        locationName={locationName}
        onReset={() => {
          const currentIndex = locationCandidates.indexOf(locationName);
          setLocationName(locationCandidates[(currentIndex + 1) % locationCandidates.length]);
        }}
      />

      <DeadlineSelector value={deadlineHours} onChange={setDeadlineHours} error={formErrors.deadline} />

      {createError && <p className="form-error">{createError}</p>}

      <button className="sticky-cta" type="button" onClick={handleSubmit} disabled={isCreating}>
        {isCreating ? '생성 중' : '투표 생성'}
      </button>
    </main>
  );
}

export default CreatePollPage;
