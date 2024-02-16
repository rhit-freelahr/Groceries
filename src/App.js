import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, setRecipes } from "firebase/firestore";
import logo from "./logo.svg";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import {
  ScrollArea,
  Separator,
  Grid,
  Checkbox,
  Table,
  Flex,
  Box,
  Heading,
  Inset,
  Text,
  Button,
  Card,
  Strong,
} from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import jsonData from "./data.json";
// import recipeData from "./recipes.json";
import { Cross2Icon } from '@radix-ui/react-icons';


const firebaseConfig = {
  apiKey: "AIzaSyAhWDLSkP17o6ho4B9M0XB44-8gqRpiE7I",
  authDomain: "groceries-4576f.firebaseapp.com",
  projectId: "groceries-4576f",
  storageBucket: "groceries-4576f.appspot.com",
  messagingSenderId: "414521883151",
  appId: "1:414521883151:web:66f5da36c50ff80ec0817a",
  measurementId: "G-BLEV0WGT1J",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Label = ({ children }) => <label>{children}</label>;

const Input = ({ value, onChange, placeholder }) => (
  <input value={value} onChange={onChange} placeholder={placeholder} />
);

const Textarea = ({ value, onChange, placeholder, rows }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
  />
);

export { Label, Input, Textarea };

function Groceries() {
  const [isAddRecipeDialogOpen, setIsAddRecipeDialogOpen] = useState(false);
  const [newRecipeName, setNewRecipeName] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesData = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };

    getRecipes();
  }, []);

  useEffect(() => {
    const getGroceries = async () => {
      const groceriesCollection = collection(db, "groceries");
      const groceriesSnapshot = await getDocs(groceriesCollection);
      const groceriesData = groceriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGroceries(groceriesData);
    };

    getGroceries();
  }, []);

  const handleOpenAddRecipeDialog = () => {
    setIsAddRecipeDialogOpen(true);
  };

  const handleCloseAddRecipeDialog = () => {
    setIsAddRecipeDialogOpen(false);
    setNewRecipeName("");
    setNewIngredient("");
    setIngredientsList([]);
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredientsList([...ingredientsList, newIngredient.trim()]);
      setNewIngredient(""); // Clear input field after adding ingredient
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredientsList = [...ingredientsList];
    updatedIngredientsList.splice(index, 1);
    setIngredientsList(updatedIngredientsList);
  };

  const handleAddRecipe = async () => {
    if (newRecipeName.trim() !== "" && ingredientsList.length > 0) {
      try {
        const ingredientsarr = []
        for(const ingredient of ingredientsList) {
          ingredientsarr.push({
            itemName: ingredient,
            checked: false,
            qty: 1,
            category: "test"
          })
        }
        const newRecipe = {
          name: newRecipeName.trim(),
          ingredients: ingredientsarr,
        };

        const docRef = await addDoc(collection(db, "recipes"), newRecipe);

        console.log("Document written with ID: ", docRef.id);

        setIsAddRecipeDialogOpen(false);
        setNewRecipeName("");
        setNewIngredient("");
        setIngredientsList([]);
        console.log("New Recipe Added:", newRecipe);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("Please fill out all fields");
    }
  };

  return (
    <Theme accentColor="gray">
      <div className="NavAndContent">
        <Flex direction="column" m="5" >
          <NavBar/>
        </Flex>

        <Flex
          direction="column"
          gap="3"
          style={{ background: "var(--gray-a4)" }}
        >
          <ScrollArea type="always" scrollbars="vertical">
            {/* Title and quick view of grocery list */}
            <Box grow="3">
              <header>
                <Heading align="center" m="5" mb="4">Qwik Groceries Generator </Heading>
              </header>
              <Container size="3">
                <Text size="3" weight="bold">Shopping List</Text>
                <ProductTable itemlist={groceries} />
              </Container>
            </Box>
            <Box grow="3">
              <div>
                <Dialog.Root
                  open={isAddRecipeDialogOpen}
                  onOpenChange={setIsAddRecipeDialogOpen}
                >
                  <Dialog.Trigger className="recipe-button">
                    <Button style={{ padding: 0 }}>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Recipe
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Overlay />
                  <Dialog.Content>
                    <Card>
                      <Inset>
                        <Text as="h2">Create New Recipe</Text>
                        <label>
                          Recipe Name:
                          <input
                            type="text"
                            value={newRecipeName}
                            onChange={(e) => setNewRecipeName(e.target.value)}
                          />
                        </label>
                        <label>
                          Ingredients:
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {ingredientsList.map((ingredient, index) => (
                              <div
                                key={index}
                                style={{
                                  marginRight: "10px",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  id={`ingredient-${index}`}
                                  checked={false}
                                  style={{ marginRight: "5px" }}
                                />
                                <label
                                  htmlFor={`ingredient-${index}`}
                                  style={{ marginRight: "5px" }}
                                >
                                  {ingredient}
                                </label>
                                <Button
                                  onClick={() => handleRemoveIngredient(index)}
                                  style={{ marginLeft: "5px" }}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                          <input
                            type="text"
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                          />
                          <Button onClick={handleAddIngredient}>
                            Add Ingredient
                          </Button>
                        </label>

                        <Button onClick={handleAddRecipe}>Add Recipe</Button>
                        <Button onClick={handleCloseAddRecipeDialog}>
                          Cancel
                        </Button>
                      </Inset>
                    </Card>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </Box>

            <Box grow="3">
              <RecommendedRecipes recipes={recipes} />
            </Box>
            
            <Box grow ="3">
              <RecipeListDisplay recipes={recipes} />
            </Box>
          </ScrollArea>
        </Flex>
      </div>

      <div className="App"></div>
    </Theme>
  );
}


function ProductTable({ itemlist }) {
  const CheckboxRows = [];
  const ItemRows = [];
  const QtyRows = [];
  const CategoryRows = [];

  itemlist.forEach((item) => {
    CheckboxRows.push(item.checked);
    ItemRows.push(item.itemName);
    QtyRows.push(item.qty);
    CategoryRows.push(item.category);
  });


  return (
    <Theme>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Bought?</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Qty</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {CheckboxRows.map((checkbox, index) => (
            <Table.Row key={index}>
              <Table.Cell><Checkbox/></Table.Cell>
              <Table.Cell>{ItemRows[index]}</Table.Cell>
              <Table.Cell>{QtyRows[index]}</Table.Cell>
              <Table.Cell>{CategoryRows[index]}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Theme>
  );
}

function AddRecipe() {}

function RecipeListTable({ recipes }){
  const RecipeNameRow = [];
  const recipeIngredientRow = [];

  recipes.forEach((rec) => {
    RecipeNameRow.push(rec.name);
    rec.ingredients.forEach(ingredient => {
      recipeIngredientRow.push(ingredient.itemName);
    })
  });

  const parseRecipe = (recipe) => {
    const ingredientsList = recipe.ingredients.map(ingredient => ingredient.itemName);
      return (
      <Table.Row>
        <Table.Cell>
          <Checkbox/>
        </Table.Cell>
        <Table.Cell>
          {recipe.name}
        </Table.Cell>
        <Table.Cell>
          {ingredientsList.join(", ")}
        </Table.Cell>
      </Table.Row>
    )
  } 

  return(
    <Theme>
        <Text size="6" weight="bold">Recipe List</Text>
      <Table.Root>
        <Table.Header>
         <Table.Row>
          <Table.ColumnHeaderCell>Do you want this?</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Recipe Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Ingredient</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
        <Table.Body>
          {recipes.map(recipe => {
            return parseRecipe(recipe)
          })}
        </Table.Body>
      </Table.Root>
    </Theme>
  );
}

async function addGroceries (groecery) {
  const docRef = await addDoc(collection(db, "groceries"), groecery);
}

function RecipeListDisplay ({ recipes }){
  return(  
  <Theme>
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant="outline">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
        View more recipes
      </Button>

    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <RecipeListTable recipes={recipes} />
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  </Theme>
)
}

function NavBar (){
  return(
    <Theme>
      <Flex direction="column">
      <Text size="8" weight="bold"> Quik Groceries</Text>

      <Separator my="3" size="9" />

      <Text size="6" weight="bold" mb="3">Home</Text>
      <Text size="6" weight="bold" mb="3">Shopping List</Text>
      <Text size="6" weight="bold" mb="3">Add Recipe</Text>
      <Text size="6" weight="bold" mb="3">View Recipe</Text>
      <Text size="6" weight="bold" mb="3">Profile</Text>
      <Text size="6" weight="bold" mb="3">About us</Text>
      </Flex>
    </Theme>
  )
}

function RecipeCard (recipe) {
  
  const handleAddToGroceries = () => {
    recipe.ingredients.forEach((ingredient) => {
      addGroceries(ingredient)
    })
    // if (!recipe || !recipe.name) {
    //   return null; // or some fallback UI
    // }
  }
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="recipe-button">
          <Box width="auto" height="30">
            <Card size="2" style={{ maxWidth: 240 }}>
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                  alt="Bold typography"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 140,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>{recipe.name}</Strong>
              </Text>
            </Card>
          </Box>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className='recipe-modal-overlay'>
            <Dialog.Content className='recipe-modal' >
                <h2>{recipe.name}</h2>
                <hr/>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                      <label>
                        <input
                          type="checkbox"
                          name={`ingredient-${index}`}
                          value={ingredient.itemName}
                        />
                        {ingredient.itemName}
                      </label>
                  ))}
                </ul>
                <Button onClick={handleAddToGroceries}>Add Ingredients to Groceries</Button>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function RecommendedRecipes({ recipes }) {
  return (
    <Theme>
      <Heading align="left">Recommended Recipes</Heading>

      <Flex gap="9">
        {recipes.map((recipe, index) => {
          if(index < 3) return RecipeCard(recipe)
        })}
      </Flex>
    </Theme>
  );
}

export default function App() {
  
  return <Groceries/>;
}
