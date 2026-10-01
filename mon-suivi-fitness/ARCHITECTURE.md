# Architecture

## Vue d'ensemble

Cette application est un suivi de fitness en 8 semaines, construit avec Next.js 14, TypeScript et Tailwind CSS.

## Structure proposée

- `app/` : routes, layout principal et pages de navigation
- `components/` : composants réutilisables comme les cartes d'exercices et la barre de progression
- `lib/` : données et utilitaires
- `public/gifs/` : ressources visuelles des exercices

## Règles de conception

- Le rendu doit rester simple et lisible.
- L'expérience utilisateur doit être centrée sur la progression hebdomadaire.
- Les données des semaines doivent être faciles à modifier et à étendre.
- Les GIFs doivent être réutilisées pour chaque séance.
