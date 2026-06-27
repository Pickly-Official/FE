import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PicklyTopBar from '../components/common/PicklyTopBar';
import LocationCard from '../components/poll/LocationCard';
import PhotoGrid from '../components/poll/PhotoGrid';
import { POLL_OPTIONS } from '../constants/pollOptions';
import { useImageUpload } from '../hooks/useImageUpload';
import { usePoll } from '../hooks/usePoll';
import { analyzePhotoLocations } from '../services/locationService';
import { validatePoll } from '../utils/validatePoll';

function CreatePollPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [deadlineHours, setDeadlineHours] = useState(POLL_OPTIONS.durations[1].value);
  const [locationName, setLocationName] = useState('');
  const [isAnalyzingLocation, setIsAnalyzingLocation] = useState(false);
  const [locationGroups, setLocationGroups] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const { photos, addPhotos, removePhoto, resetPhotos, error: imageError } = useImageUpload();
  const { createPoll, isCreating, error: createError } = usePoll();
  const isReadyToCreate = title.trim().length > 0 && photos.length >= POLL_OPTIONS.minPhotos && locationGroups.length > 0;
  const submitError = formErrors.title || formErrors.photos || formErrors.location || createError;

  const resetLocationAnalysis = () => {
    setLocationGroups([]);
    setIsAnalyzingLocation(false);
  };

  const handleAddPhotos = (fileList) => {
    resetLocationAnalysis();
    addPhotos(fileList);
  };

  const handleRemovePhoto = (photoId) => {
    resetLocationAnalysis();
    removePhoto(photoId);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setFormErrors((current) => {
      if (!current.title) {
        return current;
      }

      return { ...current, title: '' };
    });
  };

  const handleAnalyzeLocation = async () => {
    if (photos.length < POLL_OPTIONS.minPhotos) {
      setFormErrors((current) => ({
        ...current,
        photos: `사진을 최소 ${POLL_OPTIONS.minPhotos}장 추가해주세요.`,
      }));
      return;
    }

    setFormErrors((current) => ({ ...current, photos: '' }));
    setIsAnalyzingLocation(true);

    try {
      const result = await analyzePhotoLocations(photos);

      if (result.groups.length === 0) {
        setLocationGroups([]);
        setLocationName('');
        setFormErrors((current) => ({
          ...current,
          location: '사진에서 GPS 위치 정보를 찾지 못했어요. 위치 정보가 포함된 원본 사진을 올려주세요.',
        }));
        return;
      }

      setLocationGroups(result.groups);
      setLocationName(result.groups[0].name);
      setFormErrors((current) => ({
        ...current,
        photos: result.missingGpsSequences.length > 0
          ? `GPS가 없는 사진: ${result.missingGpsSequences.map((sequence) => `${sequence}번`).join(', ')}`
          : '',
        location: '',
      }));
    } catch (error) {
      setLocationGroups([]);
      setLocationName('');
      setFormErrors((current) => ({
        ...current,
        location: error.message || '위치 분석 중 문제가 발생했어요.',
      }));
    } finally {
      setIsAnalyzingLocation(false);
    }
  };

  const handleSubmit = async () => {
    const poll = {
      title,
      photos,
      deadlineHours,
      location: locationGroups.length > 0 ? locationName : '',
    };
    const validation = validatePoll(poll);
    const nextErrors = {
      ...validation.errors,
      location: locationGroups.length === 0 ? '사진 업로드 후 완료를 눌러 위치 정보를 확인해주세요.' : '',
    };
    setFormErrors(nextErrors);

    if (!validation.isValid || nextErrors.location) {
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
      resetLocationAnalysis();
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
      <PicklyTopBar active="create" />

      <div className="screen-title">
        <h1>새 투표 만들기</h1>
      </div>

      <label className={`field-group ${formErrors.title ? 'is-error' : ''}`}>
        <span>투표 제목</span>
        <input
          type="text"
          value={title}
          maxLength={40}
          placeholder="투표의 제목을 작성해주세요!"
          onChange={handleTitleChange}
        />
        {formErrors.title && <p className="form-error">{formErrors.title}</p>}
      </label>

      <PhotoGrid
        photos={photos}
        onAddPhotos={handleAddPhotos}
        onRemovePhoto={handleRemovePhoto}
        onComplete={handleAnalyzeLocation}
        onEditPhotos={resetLocationAnalysis}
        isProcessing={isAnalyzingLocation}
        isComplete={locationGroups.length > 0}
        error={formErrors.photos || imageError}
      />

      {locationGroups.length > 0 ? (
        <LocationCard
          locationGroups={locationGroups}
          selectedLocation={locationName}
          onReset={setLocationName}
        />
      ) : (
        <section className={`location-pending-card ${formErrors.location ? 'is-error' : ''}`}>
          사진을 업로드하고 완료를 누르면 위치 정보가 표시돼요.
        </section>
      )}

      <button className="sticky-cta" type="button" onClick={handleSubmit} disabled={isCreating}>
        {isCreating ? '생성 중' : isReadyToCreate ? '투표 생성' : '위치 확인 후 생성'}
      </button>

      {submitError && <p className="form-error create-submit-error">{submitError}</p>}
    </main>
  );
}

export default CreatePollPage;
