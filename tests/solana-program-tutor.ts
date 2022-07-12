import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaProgramTutor } from "../target/types/solana_program_tutor";

describe("solana-program-tutor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaProgramTutor as Program<SolanaProgramTutor>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
