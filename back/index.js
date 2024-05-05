const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let Game = [];
let Player = [];

app.post('/create', async (req, res) => {
    try {
        const { id, password, limit } = req.body;
        const check = Game.find(data => data.id === id);
        if (check) {
            res.json('Exist');
            console.log("not")
        } else {
            Game.push({ id, password, limit });
            res.json('done');
            console.log("done")
        }
    } catch (error) {
        console.error('Error in Game Creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/player/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const matchingPlayers = Player.filter(player => player.mid === id);
        res.json(matchingPlayers);
    } catch(err) {
        console.log("Error in Player", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/playercreate', async (req, res) => {
    try {
        const { pid, password, name, mid,score } = req.body;
        const check = Player.find(data => data.pid === pid);
        const matchingPlayers = Player.filter(player => player.mid === mid);
        const getlimit = Game.find(data => data.id === mid);
        console.log(getlimit.limit)
        if(matchingPlayers.length < getlimit.limit){
            if (check) {
                res.json('Exist');
                console.log("not")
            } else {
                Player.push({ pid, password, name, mid,score });
                res.json('done');
                console.log("done");
            }
        }
        else{
            res.json('limit')
        }
       
    } catch (error) {
        console.error('Error in Player Creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/playerpassword', async (req,res)=>{
    try {
        const { pid, password } = req.body;
        const check = Player.find(data => data.pid === pid);
        if (check.password === password) {
            res.json('correct');
            console.log("Coorect password")
        } else {
            res.json('not');
            console.log("Wrong password")
        }
    } catch (error) {
        console.error('Error in Password:', error);
    }
})


app.post('/contestlog', async (req, res) => {
    try {
        const { id, password, limit } = req.body;
        const check = Game.find(data => data.id === id);
        if (check) {
            res.json('Exist');
            console.log("not")
        } else {
            res.json('done');
            console.log("done")
        }
    } catch (error) {
        console.error('Error in Game Creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = Game.length; 
        Game = Game.filter(game => game.id !== id); 
        const finalLength = Game.length;
        if (finalLength < initialLength) {
            res.json('deleted');
            console.log("Games deleted successfully");
        } else {
            res.status(404).json('No games found to delete');
            console.log("No games found to delete");
        }
    } catch (error) {
        console.error('Error in deleting games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/Game', async (req, res) => {
    res.send(Game);
})
app.get('/Player', async (req, res) => {
    res.send(Player);
})

app.listen(5000, () => {
    console.log("Server is Running")
})
