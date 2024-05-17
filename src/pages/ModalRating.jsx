/* eslint-disable react/prop-types */
// import React from 'react'

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const postRating = async ({ id, rating }) => {
  const response = await fetch(
    `http://localhost:8000/rating/${id}?rating=${rating}`,
    {
      method: "POST",
    }
  );
  return response.json();
};

const ModalRating = ({ openModal, setOpenModal }) => {
  const { id } = useParams();
  const [starValue, setStarValue] = useState(0);
  const [tempValue, setTempValue] = useState(0);

  const handleHover = (val) => {
    if (starValue === 0) {
      setTempValue(val);
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: postRating,
    onSuccess: () => {
      console.log("Rating berhasil dikirim");
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = async () => {
    await mutate({
      id,
      rating: parseInt(starValue),
    });
    // setOpenModal(false);
  };

  const handleClick = (val) => {
    setStarValue(val);
    setTempValue(0);
  };

  const handleMouseLeave = () => {
    setTempValue(0);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill =
      starValue >= i || tempValue >= i ? "text-yellow-500" : "text-gray-300";
    stars.push(
      <svg
        key={i}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleHover(i)}
        onMouseLeave={handleMouseLeave}
        className={`w-10 h-10 cursor-pointer fill-current ${fill}`}
        viewBox="0 0 24 24"
      >
        {/* your star icon */}
        <path d="M12 2l2.56 7.377L22 9.745l-6.468 5.65L17.692 22 12 18.435 6.308 22l1.16-6.605L2 9.745l7.44.632L12 2z" />
      </svg>
    );
  }

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      {isLoading && <Loading />}
      <Modal.Header>Berikan Rating</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Berikan penilaian anda terhadap penangnanan laporan ini
          </p>
          <div className="mb-2 block">
            <div className="flex">
              {stars.map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit()}>Kirim</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRating;
