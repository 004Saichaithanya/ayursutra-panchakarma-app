# Ayurvedic Chatbot

## Overview

This is an AI-powered chatbot application focused on Ayurvedic medicine and wellness. The system combines traditional Ayurvedic knowledge with modern AI capabilities using Google's Gemini AI model. The application provides users with information about Ayurvedic principles, doshas (body constitutions), and health guidance based on classical Ayurvedic texts and practices.

The chatbot is built as a FastAPI web application that processes user queries about Ayurvedic concepts and provides contextually relevant responses by leveraging a knowledge base of Ayurvedic texts and principles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Backend Framework
- **FastAPI**: Modern Python web framework chosen for its automatic API documentation, type safety, and async support
- **Pydantic Models**: Used for request/response validation and serialization (ChatRequest, ChatResponse)
- **Async Architecture**: Utilizes FastAPI's async capabilities with lifespan context managers for efficient resource management

### AI Integration
- **Google Gemini AI**: Primary language model for generating conversational responses
- **Knowledge Retrieval System**: Implements semantic search through text vectorization and similarity matching
- **Context-Aware Responses**: Maintains conversation history and provides source attribution for responses

### Knowledge Management
- **In-Memory Knowledge Base**: Stores Ayurvedic texts and concepts in structured format with metadata
- **Vector Search**: Implements word-based vectorization for semantic similarity matching
- **Content Categorization**: Organizes knowledge by doshas, treatments, and other Ayurvedic categories

### Data Models
- **Text Representation**: Each knowledge entry includes content, metadata, source attribution, and keywords
- **Conversation Management**: Tracks user interaction history for contextual responses
- **Source Tracking**: Links responses back to specific Ayurvedic texts and references

### Response Generation
- **Hybrid Approach**: Combines retrieval-augmented generation with AI-powered natural language processing
- **Source Attribution**: Provides transparency by citing specific Ayurvedic sources
- **Context Integration**: Uses conversation history to maintain coherent dialogue flow

## External Dependencies

### AI Services
- **Google Gemini AI**: Core language model for conversational AI capabilities
- **Google GenAI SDK**: Python client library for Gemini integration

### Python Libraries
- **FastAPI**: Web framework and API development
- **Pydantic**: Data validation and serialization
- **NumPy/Pandas**: Data processing and numerical computations (referenced in attached assets)
- **Scikit-learn**: Machine learning utilities for similarity calculations
- **TQDM**: Progress tracking for data processing operations

### Environment Configuration
- **GEMINI_API_KEY**: Environment variable for Google AI authentication
- **Kaggle Integration**: Support for Kaggle dataset processing (as indicated in attached assets)

### Development Tools
- **Jupyter Notebook Support**: Compatible with notebook environments for development and testing
- **IPython Display**: Rich content rendering capabilities for enhanced user interaction