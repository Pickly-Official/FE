import { useEffect, useMemo, useRef, useState } from 'react';
import { voteService } from '../services/voteService';

export function useVote(pollId) {
  const [poll, setPoll] = useState(null);
  const [index, setIndex] = useState(0);
  const [votes, setVotes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const submissionRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    voteService.getPoll(pollId).then((nextPoll) => {
      if (isMounted) {
        setPoll(nextPoll);
        setIndex(0);
        setVotes([]);
        setSubmitResult(null);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [pollId]);

  const photos = poll?.photos ?? [];
  const currentPhoto = photos[index] ?? null;
  const isDone = photos.length > 0 && index >= photos.length;

  const progress = useMemo(() => {
    if (photos.length === 0) return 0;
    return Math.round((Math.min(index, photos.length) / photos.length) * 100);
  }, [index, photos.length]);

  const submitVote = async (value) => {
    if (!currentPhoto || isDone) return;

    const nextVotes = [
      ...votes,
      {
        photoId: currentPhoto.id,
        value,
      },
    ];

    setVotes(nextVotes);
    setIndex((current) => current + 1);

    if (nextVotes.length === photos.length) {
      const submissionId = submissionRef.current + 1;
      submissionRef.current = submissionId;
      setIsSubmitting(true);
      const result = await voteService.submit({ pollId, votes: nextVotes });
      if (submissionRef.current === submissionId) {
        setSubmitResult(result);
        setIsSubmitting(false);
      }
    }
  };

  const undo = () => {
    if (votes.length === 0) return;

    setVotes((current) => current.slice(0, -1));
    setIndex((current) => Math.max(current - 1, 0));
    setSubmitResult(null);
    setIsSubmitting(false);
    submissionRef.current += 1;
  };

  return {
    poll,
    photos,
    currentPhoto,
    currentIndex: index,
    progress,
    votes,
    isDone,
    isSubmitting,
    submitResult,
    submitVote,
    undo,
  };
}
