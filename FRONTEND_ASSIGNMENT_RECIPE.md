# Recipe Box - Frontend Developer Assignment

## Overview

Create a personal recipe management application with a strong focus on **user experience** and **visual design**. This assignment is designed to evaluate your ability to build a polished, production-ready React application that demonstrates both technical skill and design sensibility.

## Objective

Build a Recipe Box application that helps users manage their personal recipe collection with an emphasis on intuitive navigation, beautiful design, and thoughtful interactions. The app should feel delightful to use, especially on mobile devices where people typically cook.

## Core Features

### 1. Recipe Management
- Create recipes with:
  - Name, description, cuisine type, difficulty level
  - Prep time, cook time, servings
  - Photo/image
  - Custom tags
- Ingredient list with quantities and units
- Step-by-step cooking instructions
- Edit and delete recipes
- Mark recipes as favorites

### 2. Discovery & Navigation
- Engaging homepage that invites exploration
- Real-time search with suggestions
- Multiple filters: cuisine, difficulty, max cooking time, tags
- Smart sorting: by time, difficulty, recently added, favorites
- Quick access to favorite recipes

### 3. Reading Experience (UX Focus!)
- Optimized view for active cooking (large fonts, spacing, contrast)
- Check off ingredients/steps as you cook
- Auto-calculate quantities when changing servings
- Optional: integrated timers
- Hands-free friendly design

### 4. Shopping List Generator
- Select multiple recipes
- Generate aggregated shopping list (sum common ingredients)
- Organize by category (vegetables, dairy, etc.)
- Check off items you already have

### 5. Nice to Have (Make a Difference!)
- Recipe suggestions based on available ingredients
- Personal statistics (most cooked cuisine, untried recipes)
- Recipe sharing (export/link)
- Basic URL import for recipes
- Well-designed dark mode
- Skeleton screens and loading states
- Toast notifications for user feedback

## Technical Requirements

### Stack
- **React** with **TypeScript** (required)
- State management of your choice.
- Styling solution of your choice (max 1 UI library if used).
- Data persistence (localStorage, IndexedDB, or mock backend)

### Docker Setup (Required)
- Application must run in a Docker container
- Provide `Dockerfile` (multi-stage build appreciated)
- Provide `docker-compose.yml` if needed
- Include `.dockerignore`
- Configurable port (default 3000)

Quick start should be:
```bash
docker build -t recipe-box .
docker run -p 3000:3000 recipe-box
```

### Design Constraints (To Push Creativity)
- Maximum 1 UI library (if used) - rest should be custom
- No more than 3 primary colors (plus tones and grays)
- Maximum 2 font families
- Mobile-first approach

## What We Evaluate

### Design & UX
- **Visual Design**: Cohesive color palette, visual hierarchy, typography
- **Micro-interactions**: Smooth animations, immediate feedback, transitions
- **Mobile-first**: Excellent mobile experience (this is where you cook!)
- **Empty States**: What happens when there are no recipes? Does it invite action?
- **Intuitive Flow**: Can I add a recipe in <30 seconds? Find what I need easily?
- **Attention to Detail**: Consistent spacing, perfect alignment, states (hover, active, disabled)
- **Loading & Feedback**: Skeleton screens, notifications, confirmations
- **Accessibility**: Basic a11y considerations

### Technical
- **TypeScript Usage**: Meaningful types, no shortcuts with `any`
- **Component Design**: Reusability, composition, clean props
- **State Management**: Appropriate for complexity level
- **Performance**: Virtualization if needed, lazy loading images
- **Code Organization**: Maintainability, folder structure
- **Docker Setup**: Optimized build, clear documentation

### Reasoning
- **UX Decisions**: Why this interaction and not another?
- **Trade-offs**: Design/technical compromises documented
- **Assumptions**: Clear statement of what you assumed

## Deliverables

### Repository
- Clean, production-ready code
- `Dockerfile` and `docker-compose.yml`
- `.dockerignore`
- Clear folder structure

### README Must Include
1. **Screenshots/GIFs**: 3-5 key features demonstrated
2. **Quick Start**: Docker instructions
3. **Tech Stack**: What you chose and why
4. **UX Decisions**: Why did you structure the flow this way?
5. **Challenges**: What problems did you face and how did you solve them?
6. **Future Improvements**: Prioritized list of what you'd add next
7. **Time Spent**: Rough breakdown of hours

### Strongly Recommended
- **Live Demo**: Vercel/Netlify/GitHub Pages deployment

## Seed Data

Include these 3 pre-populated recipes so the app feels "alive" from the start:

### 1. Spaghetti alla Carbonara 

**Description**: Iconic Roman dish - creamy and flavorful, no cream!

**Details**:
- Cuisine: Italian
- Difficulty: Medium
- Prep Time: 10 minutes
- Cook Time: 15 minutes
- Servings: 4
- Tags: Pasta, Roman, Comfort Food, Quick
- Image: `https://images.unsplash.com/photo-1612874742237-6526221588e3`

**Ingredients**:
- Spaghetti: 400g
- Guanciale: 150g
- Eggs: 4 whole
- Pecorino Romano DOP: 100g (grated)
- Black pepper: to taste

**Instructions**:
1. Bring water to boil for pasta (salt when boiling)
2. Cut guanciale into strips and cook in pan until golden (no oil needed!)
3. In a bowl, beat eggs with grated pecorino and abundant black pepper
4. Cook spaghetti al dente, reserve 1 cup pasta water
5. Drain pasta and add to pan with guanciale (heat off!)
6. Add egg-pecorino mixture and mix quickly, adding pasta water for creaminess
7. Serve immediately with freshly ground black pepper and extra pecorino

**Notes**: Secret - creaminess comes from egg-pecorino-pasta water emulsion, NOT cream! Heat must be off when adding eggs to avoid scrambling.

---

### 2. Classic Mac and Cheese 

**Description**: The ultimate American comfort food - creamy, cheesy, perfect!

**Details**:
- Cuisine: American
- Difficulty: Easy
- Prep Time: 10 minutes
- Cook Time: 20 minutes
- Servings: 6
- Tags: Comfort Food, Pasta, Cheese, Family Favorite
- Image: `https://images.unsplash.com/photo-1543339494-b4cd4f7ba686`

**Ingredients**:
- Elbow macaroni: 450g
- Butter: 60g
- All-purpose flour: 60g
- Whole milk: 700ml
- Sharp Cheddar cheese: 300g (grated)
- Mozzarella: 150g (grated)
- Dijon mustard: 1 tsp
- Paprika: 0.5 tsp
- Salt and pepper: to taste
- Breadcrumbs: 50g (optional for topping)

**Instructions**:
1. Cook macaroni according to package (1-2 min less for al dente). Drain and set aside
2. In same pot, melt butter over medium heat
3. Add flour and whisk for 1-2 minutes (roux) until slightly golden
4. Gradually pour in milk while whisking constantly to prevent lumps
5. Cook while stirring until thickened (5-7 min)
6. Reduce heat, add cheeses, mustard, paprika, salt and pepper. Stir until fully melted
7. Add macaroni to sauce and mix well
8. OPTIONAL: transfer to baking dish, top with breadcrumbs and broil at 180°C for 15 min
9. Serve hot with a sprinkle of paprika

**Notes**: Pro tip - use freshly grated cheese, not pre-shredded (contains anti-caking agents that prevent optimal creaminess). For extra creaminess add a tablespoon of cream cheese.

---

### 3. Chicken Parmigiana 

**Description**: Italian-American fusion - breaded chicken with marinara and melted mozzarella

**Details**:
- Cuisine: Italian-American
- Difficulty: Medium
- Prep Time: 20 minutes
- Cook Time: 30 minutes
- Servings: 4
- Tags: Chicken, Cheese, Italian-American, Comfort Food, Weeknight Dinner
- Image: `https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8`

**Ingredients**:
- Chicken breasts: 4 pieces (pounded thin)
- All-purpose flour: 100g
- Eggs: 2 whole (beaten)
- Breadcrumbs: 150g
- Parmesan cheese: 50g (grated)
- Fresh mozzarella: 250g (sliced)
- Marinara sauce: 500ml
- Fresh basil: to taste
- Olive oil: as needed
- Salt and pepper: to taste

**Instructions**:
1. Preheat oven to 200°C (400°F)
2. Prepare three dishes: flour, beaten eggs, breadcrumbs mixed with parmesan
3. Salt and pepper the pounded chicken breasts
4. Dredge each breast in: flour → eggs → breadcrumbs, pressing well
5. Heat oil in pan over medium-high heat and fry breasts 3-4 min per side until golden
6. Transfer breasts to baking dish, pour marinara sauce over them
7. Top each breast with mozzarella slices and sprinkle of parmesan
8. Bake for 15-20 min until cheese is melted and lightly golden
9. Garnish with fresh basil and serve with spaghetti or salad

**Notes**: Light version - instead of frying, bake breaded breasts at 200°C for 20 min, flipping halfway, then proceed with sauce and cheese. For extra flavor add garlic powder and oregano to breadcrumbs.

---

## Data Structure Example

Here's a suggested TypeScript interface for recipes:

```typescript
interface Ingredient {
  item: string;
  quantity: number | string;
  unit: string;
  note?: string;
}

interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  image: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string[];
  notes?: string;
  isFavorite: boolean;
  createdAt: Date;
}
```

## Questions?

Feel free to make reasonable assumptions and document them in your README. We're more interested in seeing your thought process than having you ask permission for every decision.

## Submission

1. Push your code to a public GitHub repository
2. Ensure Docker setup works as documented
3. Deploy a live demo (if possible)
4. Send us the repository link

---

**Good luck, and have fun! We're excited to see what you create! **
