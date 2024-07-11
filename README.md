# Today I Learned (TIL)

Today I Learned (TIL) is a full-stack web application that allows users to share interesting facts with the world. The application uses React for the front end, Supabase for the back end which integrates PostgreSQL as the database.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Installation](#installation)
5. [Usage](#usage)
6. [File Structure](#file-structure)
7. [Contributing](#contributing)
8. [License](#license)

## Features

- Users can submit new facts with a source link and category.
- Facts are displayed with their respective categories and voting buttons.
- Users can vote facts as interesting, mind-blowing, or false.
- The app shows disputed facts based on votes.

## Technologies Used

### Front End

- **React**: A JavaScript library for building user interfaces.
- **JavaScript**: Programming language for the web.
- **HTML**: Markup language for creating web pages.
- **CSS**: Stylesheet language for designing the presentation of web pages.

### Back End

- **Supabase**: An open-source Firebase alternative that provides all the backend services you need to build a product. Supabase is considered a back-end technology because it offers:
  - Authentication: User management and authentication.
  - Database: PostgreSQL database for storing and managing data.
  - Storage: Storing and serving files.
  - APIs: Auto-generated APIs for interacting with the database.

- **PostgreSQL**: A powerful, open-source relational database system used by Supabase to store the application's data.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- A Supabase account and a project set up.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/til-app.git
cd til-app
```

2. Install the dependencies:

```bash
npm install
```

3. Set up Supabase:

   - Go to [Supabase](https://supabase.io) and create an account.
   - Create a new project.
   - Get your API URL and Anon Key from the Supabase dashboard.
   - Create a `.env` file in the root directory and add your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=https://your-supabase-url.supabase.co
REACT_APP_SUPABASE_KEY=your-supabase-key
```

4. Start the development server:

```bash
npm start
```

## Usage

### Running the Application

- The application will run on `http://localhost:3000`.
- You can add new facts, vote on existing facts, and filter facts by category.

## File Structure

Here's a brief overview of the file structure:

```
til-app/
├── public/
│   ├── index.html
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── App.js
│   │   ├── Fact.js
│   │   ├── FactList.js
│   │   ├── NewFactForm.js
│   │   ├── CategoryFilter.js
│   │   ├── Header.js
│   │   ├── Loader.js
│   ├── styles/
│   │   └── style.css
│   ├── index.js
│   └── supabase.js
├── .env
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Explanation of Supabase Integration

Supabase is used in this application to handle back-end operations. Here's how it integrates:

- **Database**: Supabase uses PostgreSQL to store facts. The table `facts` includes columns like `id`, `text`, `source`, `category`, `votesInteresting`, `votesMindblowing`, and `votesFalse`.

- **Client Initialization**: In the `supabase.js` file, we initialize the Supabase client with the URL and Anon Key.

```javascript
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

- **Fetching Data**: In the `App.js` file, we use Supabase to fetch facts from the database based on the selected category.

```javascript
useEffect(() => {
  async function getFacts() {
    setIsLoading(true);
    let query = supabase.from('facts').select('*');
    if (currentCategory !== 'all') {
      query = query.eq('category', currentCategory);
    }
    const { data: facts, error } = await query.order('votesInteresting', { ascending: false }).limit(1000);
    if (!error) setFacts(facts);
    else alert('There was a problem getting data');
    setIsLoading(false);
  }
  getFacts();
}, [currentCategory]);
```

- **Submitting Data**: In the `NewFactForm.js` file, we use Supabase to insert new facts into the database.

```javascript
async function handleSubmit(e) {
  e.preventDefault();
  if (text && isValidHttpUrl(source) && category && textLength <= 200) {
    setIsUploading(true);
    const { data: newFact, error } = await supabase.from('facts').insert([{ text, source, category }]).select();
    setIsUploading(false);
    if (!error) setFacts((facts) => [newFact[0], ...facts]);
    setText('');
    setSource('');
    setCategory('');
    setShowForm(false);
  }
}
```

---

By following this README, you should be able to set up and run the TIL application, understand its structure, and contribute to its development.
