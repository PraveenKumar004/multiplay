const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let DataBase =[];

app.get('/player', async (req, res) => {
    try {
        res.json(DataBase);
    } catch(err) {
        console.log("Error in Player", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/create', async (req, res) => {
    try {
        const { name, id,password  } = req.body;
        DataBase.push({ name, id,password  })
        .then(res.json('done'))
        .catch(res.json("not"));
       
    } catch (error) {
        console.error('Error in Player Creation:', error);
    }
});



app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = DataBase.length; 
        DataBase = DataBase.filter(game => game.name !== id); 
        const finalLength = DataBase.length
        console.log(DataBase);
        if (finalLength < initialLength) {
            res.json('deleted');
            console.log("properity deleted successfully");
        } else {
            res.status(404).json('No games found to delete');
            console.log("No games found to delete");
        }
    } catch (error) {
        console.error('Error in deleting games:', error);
    }
});

app.put('/update/:ids', (req, res) => {
    const { ids } = req.params;
    const { name , id,password} = req.body;
    console.log(id)
    console.log(DataBase)
    const dataIndex = DataBase.findIndex(data => data.name === ids);

    if (dataIndex === -1) {
        console.log("Properity not found");
    } else {
        DataBase[dataIndex].name = name;
        DataBase[dataIndex].id = id;
        DataBase[dataIndex].password = password;
        console.log('properity updated'); 
    }
    res.json('update');
});


app.get('/', async (req, res) => {
    res.send(DataBase);
})


app.listen(5000, () => {
    console.log("Server is Running"
        
    )
})
