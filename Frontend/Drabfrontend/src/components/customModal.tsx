import { Modal } from "@mui/base"
import { Backdrop, Button, Fade, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

type Props = {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onSubmit: React.MouseEventHandler<HTMLButtonElement>,
    title: string,
    children: React.ReactNode
}

export const CustomModal = ({
    open,
    setOpen,
    title,
    children,
    onSubmit
}: Props) => (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
    >
        <Fade in={open}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '30%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgb(255,255,235,1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '10px',
                    border: "solid darkgray 2px"
                }}>
                <Typography id="modal-modal-title" variant="h2" component="h2" fontWeight={"bold"}>
                    {title}
                </Typography>
                {children}

                <Box display='flex' flexDirection={'row'} width={'88%'} justifyContent={'center'} padding={"25px"}>
                    <Button onClick={() => setOpen(false)} sx={{ 
                        bgcolor: 'darkgray', 
                        color: 'white',
                        ":hover": {
                            backgroundColor: "gray"
                        },
                        width: "45%", 
                        margin: "2px" }}>
                        Close
                    </Button>
                    <Button onClick={(e) => onSubmit(e)} sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        ":hover": {
                            backgroundColor: 'darkgreen',
                        },
                        width: "45%", 
                        margin: "2px"
                    }}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Fade>
    </Modal>
)