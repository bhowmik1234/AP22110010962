
export const getTopPost = async (req, res) => { 
    try {
        res.send('Hello World');
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}