import React, { useState } from 'react';

import styles from './home.module.scss';

type Card = {
  description: string;
  id: string;
  title: string;
};

const generateId = (): string => Math.random().toString(36).slice(2, 11);

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState({ title: '', description: '' });

  const addCard = () => {
    const card = { id: generateId(), title: newCard.title, description: newCard.description };
    setCards([...cards, card]);
    setNewCard({ title: '', description: '' });
  };

  const updateCard = (id: string, updatedCard: { description: string, title: string; }) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, ...updatedCard } : card)));
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div>
      <h1>Cards</h1>
      <ul className={styles.cardList}>
        <div className={styles.inputCard}>
          <input
            className={styles.titleInput}
            placeholder="Title"
            type="text"
            value={newCard.title}
            onChange={(error) => setNewCard({ ...newCard, title: error.target.value })}
          />
          <input
            className={styles.descriptionInput}
            placeholder="Description"
            type="text"
            value={newCard.description}
            onChange={(error) => setNewCard({ ...newCard, description: error.target.value })}
          />
          <button className={styles.button} onClick={addCard}>Add Card</button>
        </div>
        {cards.map((card) => (
          <li key={card.id} className={styles.card}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className={styles.cardButtons}>
              <button className={styles.button} onClick={() => updateCard(card.id, { title: newCard.title, description: newCard.description })}>
                Update
              </button>
              <button className={styles.button} onClick={() => deleteCard(card.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
