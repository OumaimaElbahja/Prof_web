<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devoirs', function (Blueprint $table) {
            $table->id(); // Clé primaire
            $table->unsignedBigInteger('cours_id'); // Clé étrangère
            $table->string('titre');
            $table->text('description')->nullable();
            $table->timestamp('date_limite')->nullable();
            $table->text('instructions')->nullable();
            $table->string('piece_jointe')->nullable();
            $table->timestamps(); // created_at & updated_at

            // Définition de la clé étrangère
            // $table->foreign('cours_id')->references('id')->on('cours')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devoirs');
    }
};