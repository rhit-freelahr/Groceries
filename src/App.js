import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  setRecipes,
  deleteDoc,
  doc
} from "firebase/firestore";
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
// import jsonData from "./data.json";
// import recipeData from "./recipes.json";



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
  const [newIngredient, setNewIngredient] = useState({
     category: "",
     checked: false,
     qty: "",
     itemName: ""
  });
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
    setNewIngredient({
      category: "",
      checked: false,
      qty: 0,
      itemName: ""
   });
    setIngredientsList([]);
  };

  const handleAddIngredient = () => {

    if(newIngredient.itemName && newIngredient.qty) {

    }
    ingredientsList.push(newIngredient)

      setIngredientsList(ingredientsList);
      setNewIngredient({
        category: "",
        checked: false,
        qty: 0,
        itemName: ""
     }); // Clear input field after adding ingredient
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredientsList = [...ingredientsList];
    updatedIngredientsList.splice(index, 1);
    setIngredientsList(updatedIngredientsList);
  };

  return (

    <Theme accentColor="gray">
      <div className="NavAndContent">

        <Flex direction="column" m="5">
          <div style={{position: "fixed"}} >
          <NavBar />
          </div>
        </Flex>

        <Flex
          direction="column"
          gap="3"
          style={{

            background: "var(--gray-a4)",

          }}
        >

            {/* Title and quick view of grocery list */}
            <Box grow="3">
              <header>
                <Heading align="center" m="5" mb="4">
                  Qwik Groceries Generator{" "}
                </Heading>
              </header>
              <Container size="3">
                <Text size="3" weight="bold">
                  Shopping List
                </Text>
                <ProductTable itemlist={groceries} />
              </Container>
            </Box>
            <Box grow="3">
              <div>
                <Dialog.Root
                  open={isAddRecipeDialogOpen}
                  onOpenChange={setIsAddRecipeDialogOpen}
                >
                  <Dialog.Trigger className="recipe-button" style={{width: "100%"}}>
                    <Button style={{ padding: "5px 10px", width: "90%" }}>
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
                  <Dialog.Portal>
                    <Dialog.Overlay className="recipe-modal-overlay">
                      <Dialog.Content className="recipe-modal">
                        <AddRecipe
                          newRecipeName={newRecipeName}
                          setNewRecipeName={setNewRecipeName}
                          newIngredient={newIngredient}
                          setNewIngredient={setNewIngredient}
                          ingredientsList={ingredientsList}
                          setIngredientsList={setIngredientsList}
                          handleAddIngredient={handleAddIngredient}
                          handleRemoveIngredient={handleRemoveIngredient}
                          setIsAddRecipeDialogOpen={setIsAddRecipeDialogOpen}
                        />
                    </Dialog.Content>
                    </Dialog.Overlay>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
            </Box>

            {/* <Box grow="3">
              <RecommendedRecipes recipes={recipes} />
            </Box> */}

            <Box grow="3" my="5">
              <RecipeListDisplay recipes={recipes} />
            </Box>

        </Flex>

      </div>

      <div className="App"></div>
    </Theme>

  );
}

function ProductTable({ itemlist }) {
  const handleDeleteGroceries = (grocery) => {
    deleteGroceries(grocery)
  }

  const editGroceries = async (grocery, e) => {
    const collect = collection(db, "groceries");
    const ref = doc(collect, grocery.id)
    const data = {
      category: grocery.category,
      checked: e,
      qty: grocery.qty,
      itemName: grocery.itemName,
    }
    await setDoc(ref, data)
  }

  const isChecked = async (grocery) => {
    const snap = collection(db, 'groceries')
    console.log(snap)
  }

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
          {itemlist.map((grocery, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Checkbox onClick={ async (e) =>  {
                  const checked = e.target.getAttribute("data-state") == "checked"
                  await editGroceries(grocery, !checked)
                }} checked={grocery.checked}/>
              </Table.Cell>
              <Table.Cell>{grocery.itemName}</Table.Cell>
              <Table.Cell>{grocery.qty}</Table.Cell>
              <Table.Cell>{grocery.category}</Table.Cell>
              <Table.Cell>
                <svg onClick={() => handleDeleteGroceries(grocery)}
                style={{ cursor: 'pointer' }} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Theme>
  );
}

let currentIngredientName = ""
let currentIngredientQuantity = 0
async function deleteRecipe(recipe) {
  await deleteDoc(doc(collection(db, 'recipes'), recipe.id));
}

function AddRecipe({
  newRecipeName,
  setNewRecipeName,
  newIngredient,
  setNewIngredient,
  ingredientsList,
  setIngredientsList,
  handleAddIngredient,
  handleRemoveIngredient,
  setIsAddRecipeDialogOpen,
}) {
  const [newRecipeDescription, setNewRecipeDescription] = useState("");


  const handleAddRecipe = async () => {
    if (newRecipeName.trim() !== "" && ingredientsList.length > 0) {
      try {
        const ingredientsarr = [];
        for (const ingredient of ingredientsList) {
          console.log(ingredient)
          ingredientsarr.push(ingredient);
        }
        const newRecipe = {
          name: newRecipeName.trim(),
          ingredients: ingredientsarr,
          description: newRecipeDescription,
        };
        console.log(ingredientsarr)

        addDoc(collection(db, "recipes"), newRecipe).then(() => {
          // window.location.reload()
        })

        setIsAddRecipeDialogOpen(false);
        setNewRecipeName("");
        setNewIngredient({
          category: "",
          checked: false,
          qty: 0,
          itemName: ""
       });
        setIngredientsList([]);
        currentIngredientName = "";
        currentIngredientQuantity = 1;
        console.log("New Recipe Added:", newRecipe);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("Please fill out all fields");
    }
  };

  return (
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
        <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ingredients</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 auto",
            }}
          >
            {ingredientsList.map((ingredient, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textAlign: "center",

                }}
              >
                <button
                  onClick={() => handleRemoveIngredient(index)} className="new-recipe-button-red"
                  style={{ }}
                >
                  {ingredient.itemName}
                </button>
              </div>
            ))} 
          </div>
          </Table.Body>
        </Table.Root>

        <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Ingredients Input</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity Input</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <input
              type="text"
              value={newIngredient.itemName}
              onChange={(e) => {
                currentIngredientName = e.target.value
                setNewIngredient({
                  category: "aa",
                  checked: false,
                  qty: currentIngredientQuantity,
                  itemName: currentIngredientName
                })
              }}
            />
            </Table.Cell>
            <Table.Cell>
              <input
              type="text"
              value={newIngredient.qty} 
              onChange={(e) =>  {
                currentIngredientQuantity = e.target.value
                setNewIngredient({
                  category: "aa",
                  checked: false,
                  qty: currentIngredientQuantity,
                  itemName: currentIngredientName
                })
              }}
            />
            </Table.Cell>

          </Table.Row>

        </Table.Body>
        </Table.Root>
          <button onClick={handleAddIngredient} className="new-recipe-button-gray">Add Ingredient</button>
        <label>
          Recipe Description:
            <input
              type="text"
              onChange={(e) => setNewRecipeDescription(e.target.value)}
            />
        </label>
        <button onClick={handleAddRecipe} className="new-recipe-button-gray">Add Recipe</button>
        <button onClick={() => setIsAddRecipeDialogOpen(false)} className="new-recipe-button-gray" style={{float: "right"}}>Cancel</button>
      </Inset>
    </Card>
  );
}

function deleteGroceries (grocery) {
  deleteDoc(doc(collection(db, "groceries"), grocery.id)).then(() => {
    window.location.reload()
  })

}


async function addGroceries (grocery) {
  const docRef = await addDoc(collection(db, "groceries"), grocery);

}


function RecipeListTable({ recipes, setRecipes }) {
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const handleDeleteIconClick = (recipe) => {
    setRecipeToDelete(recipe);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Delete the recipe from Firebase
      await deleteDoc(doc(collection(db, 'recipes'), recipeToDelete.id));

      // Update the local state to reflect the deletion
      setRecipes((prevRecipes) => prevRecipes.filter((rec) => rec.id !== recipeToDelete.id));

      // Clear the recipeToDelete state
      setRecipeToDelete(null);
    } catch (error) {
      console.error('Error deleting recipe:', error.message);
    }
  };

  const handleDeleteCancel = () => {
    setRecipeToDelete(null);
  };

  const recipeMap = recipes => {
    const mapped = recipes.map((recipe, index) => {
      return <RecipeCard recipe={recipe} canDelete={true}/>
    })
    if(recipes.length % 3 == 0) {
      return mapped
    } else if(recipes.length %3 == 1) {
      return (
        <>
        {mapped}
        {blankCard()}
        {blankCard()}
        </>
      )
    } else {
      return (
        <>
        {mapped}
        {blankCard()}
        </>
      )
    }
  }

  return (
    <Theme>
      <Theme>
      <div style={{textAlign:"center", maxWidth: "800px", margin: "0 auto"}}>
        <Heading align="center">Your Recipes</Heading>
            <Flex style={{justifyContent: "center", flexWrap: "wrap"}} gap="4">
                {recipeMap(recipes)}
              </Flex>
      </div>
    </Theme>

      {/* Delete Confirmation Dialog */}
      <Dialog.Root open={recipeToDelete !== null} onClose={handleDeleteCancel}>
        
        <Dialog.Content>
          <Text size="6" weight="bold">Confirm Deletion</Text>
          <Text>Are you sure you want to delete the recipe?</Text>
          <button onClick={handleDeleteConfirm}>Yes</button>
          <button onClick={handleDeleteCancel}>No</button>
        </Dialog.Content>
      </Dialog.Root>

    </Theme>
  );
}

// this is old one in dialog
function RecipeListDisplay({ recipes }) {
  return (
    <Theme>
            <RecipeListTable recipes={recipes} />
            <div
              style={{
                display: "flex",
                marginTop: 25,
                justifyContent: "flex-end",
              }}
            ></div>

    </Theme>
  );
}



function NavBar() {
  return (

    <Theme>
      <Flex direction="column">
        <Text size="8" weight="bold">
          
          Quik <br></br>Groceries
          <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        </Text>

        <Separator my="3" size="9" />

        <Text size="6" weight="bold" mb="3">
          Home
        </Text>
        <Text size="6" weight="bold" mb="3">
          Shopping List
        </Text>
        <Text size="6" weight="bold" mb="3">
          Add Recipe
        </Text>
        <Text size="6" weight="bold" mb="3">
        View Recipe
        </Text>

        <Text size="6" weight="bold" mb="3">
          Profile
        </Text>
        <Text size="6" weight="bold" mb="3">
          About us
        </Text>
      </Flex>
    </Theme>
  );
}

function RecipeCard({recipe, canDelete}) {
  const handleAddToGroceries = () => {
    recipe.ingredients.forEach((ingredient) => {
      console.log(ingredient)
      addGroceries(ingredient)
    })
  };
  const handleDeleteIconClick = () => {
    deleteRecipe(recipe)
  }
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="recipe-button">
          <Box width="auto" height="30">
            <Card size="2" style={{ width: 240 }}>
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
          <Dialog.Overlay className="recipe-modal-overlay">
            <Dialog.Content className="recipe-modal">
              <h2 class="recipe-card-heading">{recipe.name}</h2>
              <hr />
              <h4>Description:</h4>
              <p>{recipe.description}</p>
              <h4 class="ingredients-card-heading">Ingredients:</h4>
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
              <button className="recipe-groceries" onClick={handleAddToGroceries} >
                Add Groceries
              </button>
              {canDelete &&               
                <svg onClick={handleDeleteIconClick}
                style={{ cursor: 'pointer', float: 'right' }} width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function blankCard() {
  return (
    <>
    <div style={{padding: "0 118px"}} width="240px">&nbsp;</div>
    </>
  )
}

function RecommendedRecipes({ recipes }) {

  const recipeMap = recipes => {
    const mapped = recipes.map((recipe, index) => {
      return <RecipeCard recipe={recipe} canDelete={false}/>
    })
    if(recipes.length % 3 == 0) {
      return mapped
    } else if(recipes.length %3 == 1) {
      return (
        <>
        {mapped}
        {blankCard()}
        {blankCard()}
        </>
      )
    } else {
      return (
        <>
        {mapped}
        {blankCard()}
        </>
      )
    }
  }
  return (
    <Theme>
      <div style={{textAlign:"center", maxWidth: "800px", margin: "0 auto"}}>
        <Heading align="center">Recommended Recipes</Heading>
            <Flex style={{justifyContent: "center", flexWrap: "wrap"}} gap="4">
                {recipeMap(recipes)}
              </Flex>
      </div>
    </Theme>
  );
}

export default function App() {
  
  return <Groceries/>;
}
